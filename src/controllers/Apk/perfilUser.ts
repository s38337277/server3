import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";

export default function PerfilUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {
            let userID: number = await headerToken(req)
            let usuario = await promise_PerfilUser(userID, conn)

            conn.release()
            return res.status(200).json({ usuario })

        } catch (error) {

            conn.release()
            return res.status(400).json(status400)
        }

    })
}


const promise_PerfilUser = (idUser: number, conn: any): Promise<any> => {

    let query: string = "SELECT usuario,imgPerfil,correo,genero,fechaNacimiento,pais,ciudad from Usuarios WHERE id = ? limit 1"

    return new Promise((resolve, rejects) => {
        conn.query(query, [idUser], (err: MysqlError, results: any[]) => {

            try {
                if (err) {
                    throw err.sqlMessage
                }

                let element: any = results[0]
                resolve(element)
            } catch (error) {
                rejects(error)
            }

        })
    })

}
