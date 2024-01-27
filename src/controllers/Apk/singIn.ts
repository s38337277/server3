import { Response, Request } from "express";
import { MysqlError } from "mysql";
import bcrypts from "bcryptjs"

import { setToken } from "../../utils/token";
import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";


export default function SingIn(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {

            let { email, password } = req.body as { email: string, password: string }
            let singIng = await promise_SingIng(email, conn)

            if (typeof singIng === "string") {
                conn.release()
                return res.status(401).json("correo y/o contraseña incorrectos")
            }

            if (typeof singIng === "object") {
                let { id, auxPassword, usuario, imgPerfil } = singIng

                let compare: boolean = await bcrypts.compare(password, auxPassword)
                console.log(compare);
                
                if (!compare) {
                    conn.release()
                    return res.status(401).json("correo y/o contraseña incorrectos")
                }

                let idtoken = await setToken(id)

                conn.release()
                return res.status(200).json({
                    user: {
                        usuario, imgPerfil, email
                    },
                    token: idtoken
                })


            }

        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }

    })
}


const promise_SingIng = (email: string, conn: any): Promise<{ id: number, auxPassword: string, usuario: string, imgPerfil: string } | string> => {

    let query = "SELECT id,usuario,password,imgPerfil FROM Usuarios WHERE correo = ?"

    return new Promise((resolve, reject) => {

        conn.query(query, [email], (err: MysqlError, result: any[]) => {

            try {
                if (err)
                    throw err.message

                if (result.length === 0) {
                    resolve('Not found')
                }

                let { id, password, usuario, imgPerfil } = result[0]
                resolve({
                    id, auxPassword: password, usuario, imgPerfil
                })


            } catch (error) {
                console.log("error");
                
                reject(error)
            }

        })

    })
}