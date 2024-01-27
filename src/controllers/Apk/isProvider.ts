import { Response, Request } from "express";
import { MysqlError } from "mysql";

import { status500, status400 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";

export default function IsProvider(req: Request, res: Response) {
    connection.getConnection(async (error, conn) => {

        if (error)
            return res.status(500).json(status500)

        try {
            let idUser: number = await headerToken(req)
            let is_Provider = await promsre_isProvider(idUser, conn)

            conn.release()
            return res.status(200).json({
                is_Provider
            })

        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }

    })
}

const promsre_isProvider = (idUSer: number, conn: any): Promise<any> => {

    let query = "SELECT estado FROM `Provedor` WHERE usuario = ? LIMIT 1"

    return new Promise((resolve, rejects) => {
        conn.query(query, [idUSer], (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                if (result.length === 0)
                    resolve("empty")

                let element = result[0].estado
                resolve(element)
            } catch (error) {
                rejects(error)
            }

        })
    })

}