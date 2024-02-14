import { Response, Request } from "express";
import { MysqlError } from "mysql"
import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";



export default function Tareas(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            res.status(500).json(status500)

        try {

            let userID = await headerToken(req)
            //    let { status_problem } = req.query as { status_problem: string } /**Estado del Problema */

            /*  if (status_problem) {
                  let tasks = await promise_FilterTask(userID, status_problem, conn)
  
                  conn.release()
                  return res.status(200).json({
                      tareas: tasks
                  })
              }
  */

            let tareas = await promise_Tareas(userID, conn)
            conn.release()
            return res.status(200).json({ tareas })
        } catch (error) {
            console.log(error);
            conn.release()
            res.status(400).json(status400)
        }
    })
}



/**Obtener toda la lista de tareas  */
const promise_Tareas = (userId: number, conn: any): Promise<any> => {
    let query:string = `
    SELECT Problema.id AS problema, Problema.descripcion, Usuarios.imgPerfil, Usuarios.usuario, Solicitud.estado, AgendaProblema.calendario, TIME_FORMAT(AgendaProblema.hora, '%H:%i %p') AS hora, Solicitud.updates
    FROM
        Solicitud
        INNER JOIN Problema ON Problema.id = Solicitud.problema
        INNER JOIN Usuarios ON Usuarios.id = Problema.cliente
        INNER JOIN AgendaProblema ON Problema.id = AgendaProblema.problema
    WHERE
        Solicitud.provedor = ?
        AND Solicitud.estado NOT IN('espera', 'deposito')
    ORDER BY AgendaProblema.calendario DESC, AgendaProblema.hora DESC;
    `

    return new Promise((resolve, reject) => {
        conn.query(query, userId, (err: MysqlError, result: object[]) => {
            try {
                if (err) {
                    console.log(err)
                    throw err.message
                }
                resolve(result)
            } catch (error) {
                console.log(error);

                reject(error)
            }
        })
    })
}


/**
 * 
 * @param userId,  id del usuario (Provedor)
 * @param statusTask, estado del problema 
 * @param conn, conection
 * @returns 
 */
const promise_FilterTask = (userId: number, statusTask: string, conn: any): Promise<any> => {
    let query = 'Select ' +
        "Problema.id as problema, Problema.descripcion, Problema.estado as tarea, Usuarios.imgPerfil, Usuarios.usuario, " +
        "Solicitud.estado,AgendaProblema.calendario, AgendaProblema.hora, Solicitud.updates " +
        "from Solicitud " +
        "INNER JOIN Problema on Problema.id = Solicitud.problema " +
        "INNER JOIN Usuarios on Usuarios.id = Problema.cliente " +
        "INNER JOIN AgendaProblema on Problema.id = AgendaProblema.problema " +
        "WHERE Solicitud.estado = ?" +
        "ORDER BY  AgendaProbema.calendarios DESC, Solicitud.updates ASC  "

    return new Promise((resolve, reject) => {
        conn.query(query, [userId, statusTask], (err: MysqlError, result: object[]) => {
            try {
                if (err) throw err.message
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}


