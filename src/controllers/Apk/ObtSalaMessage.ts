import { Response, Request } from "express";
import { MysqlError } from "mysql";
import { verifyToken } from "../../utils/token";

import { status400, status500 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";



interface Bodys {
    usuario:  string,
    userTypes: "cliente" | "proveedor",
}

export default function Obtener_Sala_Message(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        conn.beginTransaction(async errT => {
            if (errT) {
                conn.release()
                return res.status(500).json(status500)
            }

            try {
                const { userTypes, usuario } = req.body as Bodys
                const userID: number = await headerToken(req)

                if (typeof usuario === "string") {
                    let usuarioAux: number = await verifyToken(usuario)
                    console.log(usuarioAux)
                    /**Conversacion de cliente a proveedor */
                    if (userTypes === "cliente") {
                        let idSala: number | null = await promise_SearchSala(usuarioAux, userID, conn)
                        if (idSala === null) {
                            idSala = await promise_CreateSala(usuarioAux, userID, conn)
                        }

                        conn.commit()
                        conn.release()
                        return res.status(200).json({ idSala })
                    }

                    /**Conversacion de proveedor a cliente */
                    if (userTypes === "proveedor") {
                        let idSala: number | null = await promise_SearchSala(userID, usuarioAux, conn)
                        if (idSala === null) {
                            idSala = await promise_CreateSala(userID, usuarioAux, conn)
                        }

                        conn.commit()
                        conn.release()
                        return res.status(200).json({ idSala })
                    }
                    return
                }

      
                throw ""
            } catch (error) {
                console.log(error)
                conn.rollback(err => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })
    })

}



const promise_SearchSala = (userProveedor: number, userCliente: number, conn: any): Promise<any> => {

    const query = "Select sala from Conversacion WHERE  userProveedor = ? and userCliente =  ? "
    return new Promise(async (resolve, reject) => {
        conn.query(query, [userProveedor, userCliente], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.message
                }

                if (result.length === 0)
                    resolve(null)

                let { sala } = result[0]
                resolve(sala)

            } catch (error) {
                reject(error)
            }
        })
    })
}


const promise_CreateSala = (userProveedor: number, userCliente: number, conn: any): Promise<any> => {

    const query = "Insert into Conversacion set ? "

    return new Promise((resolve, reject) => {
        conn.query(query, { userProveedor, userCliente }, async (err: MysqlError, result: any[]) => {

            try {
                if (err) {
                    throw err.message
                }

                let idSala: number = await promise_SearchSala(userProveedor, userCliente, conn)
                resolve(idSala)
            } catch (error) {
                reject(error)
            }
        })
    })

}
