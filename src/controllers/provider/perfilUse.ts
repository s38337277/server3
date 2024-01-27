import { Response, Request } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";
import { status400, status500 } from "../../utils/statusCode";


export default function PerfilUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {
            let userID: number = await headerToken(req)

            let detalles = await promise_Usuario(userID, conn)
            let sources = await promise_Sources(userID, conn)
            let area = await promise_Areas(userID, conn)

            conn.release()
            return res.status(200).json({
                detalles,sources,area
            })
        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }
    })

}


const promise_Usuario = (idUser: number, conn: any): Promise<any> => {

    const query = "Select informacion,ciudad from Provedor WHERE usuario = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [idUser], (err: MysqlError, result: any[]) => {
            try {

                if (err)
                    throw err.message

                let element = result[0]
                resolve(element)
            } catch (error) {
                reject(error)
            }
        })
    })

}


const promise_Sources = (idUser: number, conn: any): Promise<any> => {

    const query = "SELECT url from `ImagenProv` WHERE provedor = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [idUser], (err: MysqlError, result: any) => {
            try {

                if (err)
                    throw err.message

                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}


const promise_Areas = (idUser: number, conn: any): Promise<any> => {

    const query = "Select area from AreaProve WHERE usuario = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [idUser], (err: MysqlError, result: any) => {
            try {

                if (err)
                    throw err.message

                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}

