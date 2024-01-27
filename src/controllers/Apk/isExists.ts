import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";



export default function IsExistUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        try {

            let { usuario } = req.query as { usuario: string }

            let isExists: string | boolean = await promiseIsExist(usuario, conn)

            if (typeof isExists === "boolean") {
                conn.release()
                return res.status(200).json({ isExists })
            }
        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }

    })
}

const promiseIsExist = (usuario: string, conn: any): Promise<string | boolean> => {

    let query: string = "SELECT usuario FROM `Usuarios` WHERE usuario = ? LIMIT 1"

    return new Promise((resolve, reject) => {
        conn.query(query, [usuario], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                if (result.length != 0) {
                    resolve(true)
                }

                resolve(false)
            } catch (error) {
                reject(error)
            }
        })
    })
}