import { Response, Request } from "express";
import bcrypts from "bcryptjs"
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status200, status400, status409, status500 } from "../../utils/statusCode";
import { setToken } from "../../utils/token";


type Bodys = {
    usuario: string, password: string, email: string, fechaNacimiento: string, ciudad: string, genero: "hombre" | "mujer"
}


export default function RegisterIn(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async (errT) => {

            if (errT)
                return res.status(500).json(status500)

            try {
                let element: Bodys = req.body as Bodys


                let hashPass = await bcrypts.hash(element.password, 10)
                let registeIn: string = await promise_RegisterIn(element, hashPass, conn)

                if (registeIn !== "ok") {
                    conn.release()
                    return res.status(409).json(status409)
                }

                let search: string = await promise_Search(element.email, conn)

                let idToken = await setToken(search)


                conn.commit()
                conn.release()

                return res.status(200).json({
                    user: {
                        usuario: element.usuario,
                        email: element.email
                    },
                    token: idToken
                })

            } catch (error) {

                console.log(error)
                conn.rollback(() => {
                    throw err;
                });
                conn.release()
                return res.status(400).json(status400)
            }

        })
    })

}


const promise_RegisterIn = (element: Bodys, password: string, conn: any): Promise<any> => {

    const { usuario, email, fechaNacimiento, genero, ciudad } = element
    const query = "INSERT INTO Usuarios set ?"
    const inicio = new Date()

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario, password, correo: email, fechaNacimiento, genero, ciudad: ciudad.toLocaleLowerCase(), inicio }, ((err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    if (err.code == "ER_DUP_ENTRY") {
                        resolve("ER_DUP_ENTRY")
                    }
                    throw err.sqlMessage
                }

                resolve("ok")

            } catch (error) {
                reject(error)
            }
        }))
    })
}


const promise_Search = (correo: string, conn: any): Promise<any> => {

    const query = "SELECT id from Usuarios WHERE correo = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [correo], (err: MysqlError, result: any[]) => {
            try {

                if (err)
                    throw err.message

                let { id } = result[0]
                resolve(id)
            } catch (error) {
                reject(error)
            }
        })
    })

}