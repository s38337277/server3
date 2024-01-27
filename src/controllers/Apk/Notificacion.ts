import { Response, Request } from "express";
import { MysqlError } from "mysql";
import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";
import { status400, status500 } from "../../utils/statusCode";


export default function Notificacion(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {
            let userId: number = await headerToken(req)
            let { tipoUser } = req.query as { tipoUser: string }

            let Notifications = await promiseNotify(userId, tipoUser, conn)

            conn.release()
            return res.status(200).json({ Notifications })
        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })

}


const promiseNotify = (userId: number, tipoUser: string, conn: any): Promise<any> => {

    let query = "Select title, descripcion, tipoUser, estado, creacion from Notificacion where  usuario = ? and tipoUser = ? order by creacion desc limit 70"

    return new Promise((resolve, reject) => {
        conn.query(query, [userId, tipoUser], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.message
                }
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

}



