import { Response, Request } from "express";

import connection from "../../connection/mysql";
import { status500, status400 } from "../../utils/statusCode";


export default function Area(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {
            let areas = await resolve_Area(conn)

            conn.release()
            return res.status(200).json({areas})
        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }
    })
}

const resolve_Area = (conn: any): Promise<string> => {
    let query = "Select areas as area,categoria from Area  ORDER BY categoria "

    return new Promise((resolve, reject) => {
        conn.query(query, (err: any, result: any) => {
            try {
                if (err) throw err.message
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

}

