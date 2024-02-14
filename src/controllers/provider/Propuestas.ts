import { Request, Response } from "express";
import connection from "../../connection/mysql";
import { status500, status400 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";
import { MysqlError } from "mysql";


export default function Propuestas(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {

            let userId: number = await headerToken(req)

            let propuestas: any = await promise_Propuesta(userId, conn)
            conn.release()
            return res.status(200).json({ propuestas })

        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })
}


const promise_Propuesta = (userId: number, conn: any): Promise<any> => {
    let query: string = `
    SELECT
        Solicitud.id AS propuesta, Problema.id AS problema, Problema.area, Solicitud.descripcion, Usuarios.imgPerfil,
        Usuarios.usuario, Problema.area, Solicitud.estado, Solicitud.creaacion AS publicado
    FROM
        Problema
    INNER JOIN
        Usuarios ON Problema.cliente = Usuarios.id
    INNER JOIN
        Solicitud ON Problema.id = Solicitud.problema
    WHERE
        Solicitud.provedor = ?
    ORDER BY
        Solicitud.creaacion DESC
    LIMIT
        250

    `
    return new Promise((resolve, reject) => {
        conn.query(query, userId, (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

}




