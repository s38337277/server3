import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";
import { headerToken, verifyToken } from "../../utils/token";


type Bodys = {
    usuario: string,
    title: string,
    descripcion: string,
    tipoUser: 'cliente' | 'proveedor'
}


export default function NewNotification(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err) {
            return res.status(500).json(status500)
        }
        try {
            let { usuario, title, tipoUser, descripcion } = req.body as Bodys
            let userID: number = await verifyToken(usuario)
            let nuevo = await promise_New(userID, title, descripcion, tipoUser, conn)

            conn.release()
            return res.status(200).json("ok")

        } catch (error) {
            console.log(error);

            conn.release()
            return res.status(400).json(status400)
        }

    })
}


const promise_New = (usuario: number, title: string, descripcion: string, tipoUser: 'cliente' | 'proveedor', conn: any): Promise<string> => {

    let query = "insert into Notificacion set ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario, title, descripcion, tipoUser }, (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw (err.message)

                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })
}