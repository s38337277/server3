import { Response, Request } from "express";
import { MysqlError } from "mysql";

import { headerToken } from "../../utils/token";
import connection from "../../connection/mysql";
import { status200, status400, status500 } from "../../utils/statusCode";

type Bodys = {
    imgPerfil: string,
    fechaNacimiento: string,
    pais: string
    ciudad: string
    genero: 'hombre' | 'mujer'
    informacion: string | undefined
}



export default function EditUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err) {
            return res.status(500).json(status500)
        }

        conn.beginTransaction(async (errTr) => {
            try {

                let userID: number = await headerToken(req)

                let element: Bodys = req.body as Bodys

                let usuario = await promise_EditUser(element, userID, conn)

                if (typeof element.informacion !== "undefined") {
                    let provedor = await promise_Informacion(element.informacion, userID, conn)
                }

                conn.commit()
                conn.release()
                return res.status(200).json(status200)

            } catch (error) {
                console.log(error)
                conn.rollback(err => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })
    })
}



const promise_EditUser = (element: Bodys, idUser: number, conn: any): Promise<string> => {

    let query: string = "UPDATE Usuarios SET ? WHERE id = ?"
    let { fechaNacimiento, imgPerfil, genero, pais, ciudad } = element

    return new Promise((resolve, reject) => {
        conn.query(query, [{ fechaNacimiento, imgPerfil, genero, pais:pais.toLocaleLowerCase(), ciudad:ciudad.toLocaleLowerCase() }, idUser], (err: MysqlError, result: any[]) => {
            try {

                if (err) {
                    console.log(err)
                    throw err.sqlMessage
                }

                resolve("ok")

            } catch (error) {

                reject(error)
            }
        })
    })
}


const promise_Informacion = (informacion: string, userID: number, conn: any): Promise<string> => {

    let query: string = "UPDATE Provedor SET ? WHERE usuario = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [{ informacion }, userID], (err: MysqlError, result: any[]) => {
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
