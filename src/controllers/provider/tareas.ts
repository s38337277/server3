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
            let { status_problem } = req.query as { status_problem: string } /**Estado del Problema */

            if (status_problem) {
                let tasks = await promise_FilterTask(userID, status_problem, conn)

                conn.release()
                return res.status(200).json({
                    tareas: tasks
                })
            }


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
    let query = "SELECT " +
        "Problema.id AS problema, Problema.descripcion, Usuarios.imgPerfil, " +
        "Usuarios.usuario, Solicitud.estado, AgendaProblema.calendario, AgendaProblema.hora, " +
        "Solicitud.updates " +
        "FROM Solicitud " +
        "INNER JOIN Problema ON Problema.id = Solicitud.problema " +
        "INNER JOIN Usuarios ON Usuarios.id = Problema.cliente " +
        "INNER JOIN AgendaProblema ON Problema.id = AgendaProblema.problema " +
        "WHERE " +
        "   Solicitud.provedor = 3234 AND Solicitud.estado != 'espera' " +
        "ORDER BY " +
        "   CASE " +
        "       WHEN Solicitud.estado = 'proceso' THEN 1 " +
        "       WHEN Solicitud.estado = 'resuelto' THEN 2 " +
        "       WHEN Solicitud.estado = 'cancelado' THEN 3 " +
        "       ELSE 4 " +
        "   END, " +
        "   AgendaProblema.calendario ASC, " +
        "   AgendaProblema.hora ASC, " +
        "   Solicitud.creaacion ASC;";

    return new Promise((resolve, reject) => {
        conn.query(query, userId, (err: MysqlError, result: object[]) => {
            try {
                if (err) throw err.message
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
        "WHERE Solicitud.provedor = ? and Solicitud.estado = ?" +
        "ORDER BY  Problema.estado DESC, Solicitud.updates ASC  "

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


