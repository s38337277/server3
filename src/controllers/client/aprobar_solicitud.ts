import { Request, Response } from "express"

import connection from "../../connection/mysql"
import { status500, status400 } from "../../utils/statusCode"
import { MysqlError } from "mysql"


export default function Aprobar_propuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async err => {
            try {
                let { id } = req.body as Body

                let solicitud = await promise_solicitud(id, conn)
                let estado = await promise_Estado(id, conn)

                conn.commit()
                conn.release()
                return res.status(200).json('aceptado')
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


type Body = {
    id: number
}


const promise_solicitud = (id: number, conn: any): Promise<string> => {

    let query = "UPDATE  Solicitud set ? WHERE id = ? LIMIT 1"

    let estado = "deposito"
    let updates = new Date()

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

const promise_Estado = (id: number, conn: any): Promise<string> => {

    let query = "UPDATE  Problema set ? WHERE id = (Select problema from Solicitud WHERE id = ?)  LIMIT 1 "
    let estado = "proceso"
    let updates = new Date()


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