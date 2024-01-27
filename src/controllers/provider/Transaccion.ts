import { Request, Response } from "express";
import { MysqlError } from "mysql";
import connection from "../../connection/mysql";
import { status500, status400 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";



export default function Transaccion(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {

            let idUser: number = await headerToken(req)
            let transaccion = await promise_Finanzas(idUser, conn)

            conn.release()
            return res.status(200).json({
                transaccion
            })

        } catch (error) {
            console.log(error);
            conn.release()
            return res.status(400).json(status400)
        }

    })
}


const promise_Finanzas = (idUser: number, conn: any): Promise<any> => {

    let query = "SELECT " +
        "Round(Sum(Solicitud.precio), 2) as ganancias " +
        "from Solicitud " +
        "INNER JOIN Problema on Solicitud.problema = Problema.id " +
        "WHERE Solicitud.provedor = 3234 " +
        "AND Solicitud.estado = 'resuelto' " +
        "AND Problema.estado = 'resuelto' "

    return new Promise((resolve, rejects) => {
        conn.query(query, idUser, (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.message
                }
                let element = result[0].ganancias
                resolve(element)
            } catch (error) {
                rejects(error)
            }
        })
    })
}


const promise_Areas = (idUser: number, conn: any): Promise<any> => {

    let query = "Select area from AreaProve WHERE usuario = ?"

    return new Promise((resolve, rejects) => {
        conn.query(query, idUser, (err: MysqlError, result: object[]) => {
            try {
                if (err) {
                    throw err.message
                }
                resolve(result)
            } catch (error) {
                rejects(error)
            }
        })
    })
}




