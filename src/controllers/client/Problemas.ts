import { Request, Response } from "express";

import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";
import { status500, status400 } from "../../utils/statusCode";
import { MysqlError } from "mysql";

export default function Problema(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        try {
            if (err)
                return res.status(500).json(status500)

            let idUser: number = await headerToken(req)

            let Problemas = await resolveProblema(idUser, conn)

            conn.release()
            return res.status(200).json({Problemas})

        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }
    })
}

const resolveProblema = (id: number, conn: any): Promise<any> => {

    let query = "select id as problema, descripcion, area,estado ,inicio from Problema WHERE cliente = ? ORDER BY inicio DESC limit 50"

    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err: MysqlError, result: any[]) => {
            try {
                if (err){
                    throw err.sqlMessage
                }
                
                resolve(result)
            }
             catch (error) {
                reject(error)
            }
        })
    })

}