import { Response, Request } from "express";
import { MysqlError } from "mysql";


import { status400, status500,status200 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";


interface Bodys {
    sala: number
    message: string,
}

export default function SendMessage(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        conn.beginTransaction(async errT => {
            if (errT) {
                conn.release()
                return res.status(500).json(status500)
            }

            try {
                const { sala, message } = req.body as Bodys
                const userId: number = await headerToken(req)
                console.log("idDS")
                let send_message = await promise_SendMessage(sala, userId, message, conn)

                conn.commit()
                conn.release()
                return res.status(200).json(status200)

            } catch (error) {
                console.log(error);
                conn.rollback(err => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })
    })

}


const promise_SendMessage = (sala_id: number, usuario_emisor: number, mensaje: string, conn: any): Promise<any> => {

    const query = "Insert into Messages set ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { sala_id, usuario_emisor, mensaje }, (err: MysqlError, result: any) => {

            try {
                if (err) {
                    throw err.message
                }
                resolve("ok")
            } catch (error) {
                reject(error)
            }

        })
    })

}


