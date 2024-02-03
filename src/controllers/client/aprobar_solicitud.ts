import { Request, Response } from "express"

import connection from "../../connection/mysql"
import { status500, status400, status200 } from "../../utils/statusCode"
import { MysqlError } from "mysql"



type Body = {
    id: number
}


export default function Aprobar_propuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async err => {
            try {
                let { id } = req.body as Body

                let solicitud = await promise_solicitud(id, conn)

                conn.commit()
                conn.release()
                return res.status(200).json(status200)
            } catch (error) {
                console.log(error)
                conn.rollback(err => {
                    throw err
                })
                conn.release()
                return res.status(400).json(status400)
            }
        })
    })
}



const promise_solicitud = (id: number, conn: any): Promise<string> => {

    let query = "UPDATE  Solicitud set ? WHERE id = ? LIMIT 1"

    let estado = "deposito"
    let updates = new Date()
    console.log(estado);
    
    return new Promise((resolve, reject) => {
        conn.query(query, [{ estado, updates }, id], (err: MysqlError, result: any[]) => {
            try {
                if (err) throw err.sqlMessage
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}

