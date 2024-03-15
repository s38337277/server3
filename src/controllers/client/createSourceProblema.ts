import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status500, status400, status413, status200 } from "../../utils/statusCode";

export default function CreateSourceProblem(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        console.log(req.body)
        try {

            if (err) {
                return res.status(500).json(status500)
            }

            let { source, problema } = req.body as { source: any[], problema: number }
            for (let index = 0; index < source.length; index++) {

                const url = source[index];

                const process = await resolve_Sources(problema, url, conn)
            }

            conn.release()
            return res.status(200).json(status200)

        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }

    })
}




const resolve_Sources = (problema: number, url: string, conn: any): Promise<string> => {
    const query = "INSERT INTO ImageProblema set ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { problema, url }, (err: MysqlError, result: any[]) => {

            try {
                if (err) {
                    throw err.sqlMessage
                }
                resolve("ok")
            } catch (error) {
                reject(error)
            }

        })
    })
}

