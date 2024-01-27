import { Response, Request } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status200, status400, status500 } from "../../utils/statusCode";
import { verifyToken } from "../../utils/token";

type Bodys = {
    usuario: string,
    typeUser: "cliente" | "proveedor",
    solicitud: number,
    comentario: string
    estrella: number
}

export default function CalificarUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        try {
            let element: Bodys = req.body as Bodys
            let usuario: number = await verifyToken(element.usuario)

            let calificar: string = await promise_Calificar(element, usuario, conn)

            conn.release()
            return res.status(200).json(status200)

        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }

    })
}


const promise_Calificar = (element: Bodys, usuario: number, conn: any): Promise<string> => {

    let { typeUser, solicitud, comentario, estrella } = element
    let query: string = "INSERT INTO Calificacion SET ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario, estrella, comentario, solicitud, typeUSer: typeUser }, (err: MysqlError, conn: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                resolve("ok")
            } catch (error) {
                reject("error")
            }
        })
    })


}