import { Request, Response } from "express";

import { status400, status500 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { MysqlError } from "mysql";

export default function Proveedores(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        try {

            let Proveedores = await promise_Proveedors(conn)

            conn.release()
            return res.status(200).json({Proveedores})

        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }

    })
}



const promise_Proveedors = (conn: any): Promise<any> => {

    let sqlQuery = ``

    return new Promise((resolve, reject) => {
        conn.query(sqlQuery, (err: MysqlError, result: any[]) => {
            try {

                if(err){
                    throw err.sqlMessage
                }

                resolve(result)
            } catch (error) {
                reject(error)
            }

        })
    })
}