import { Response, Request, response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status500, status400 } from "../../utils/statusCode";
import { headerToken, setToken } from "../../utils/token";

interface Bodys {
    sala: number
}

/**
 * Mensajes de la sala usuarios
 * 
 * @param req 
 * @param res 
 */
export default function Conversacion(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {

            let userId: number = await headerToken(req)
            let { idSala } = req.query as { idSala: string }

            let mensajes: object[] = await promise_SalaElement(userId, Number(idSala), conn)
            let detalle_Sala = await promise_SalaInfo(Number(idSala), conn)
            conn.release()
            return res.status(200).json({ mensajes, detalle_Sala })

        } catch (error) {

            conn.release()
            return res.status(400).json(status400)
        }
    })

}


const promise_SalaElement = (userId: number, sala: number, conn: any): Promise<any> => {

    const query = "SELECT id_messages,sala_id,mensaje,IF(usuario_emisor = ?, TRUE, FALSE) AS condicion,creates FROM Messages WHERE sala_id = ?"
    return new Promise((resolve, rejects) => {
        conn.query(query, [userId, sala], (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.message
                resolve(result)
            } catch (error) {
                rejects(error)
            }
        })
    })
}

const promise_SalaInfo = (sala: number, conn: any): Promise<any> => {

    const query = "SELECT userCliente,userProveedor,creacion FROM Conversacion WHERE sala = ? LIMIT 1"

    return new Promise((resolve, reject) => {
        conn.query(query, [sala], async (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.message

                let { userCliente, userProveedor, creacion } = result[0]

                let auxClient: string = await setToken(userCliente)
                let auxProv: string = await setToken(userProveedor)

                resolve({
                    cliente: auxClient, proveedor: auxProv
                })

            } catch (error) {
                reject(error)
            }
        })
    })

}