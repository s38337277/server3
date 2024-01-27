import { Request, Response } from "express";
import { MysqlError } from "mysql";

import { headerToken } from "../../utils/token";
import connection from "../../connection/mysql";
import { status200, status400, status409, status500 } from "../../utils/statusCode";


type Body = {
    antecedentes: string,
    cedula: string,
    area: string
}

export default function RegisterProvider(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async (errT) => {
            if (errT) {
                return res.status(500).json(status500)
            }

            try {

                let userID: number = await headerToken(req)
                let { antecedentes, cedula, area } = req.body as Body

                let register: string = await promise_RegisterProvider(userID, antecedentes, cedula, conn)

                if (register === "ER_DUP_ENTRY") {
                    conn.rollback(err => err)

                    conn.release()
                    return res.status(409).json(status409)
                }

                let areaProv = await promise_AreaProv(userID, area, conn)

                conn.commit()
                conn.release()
                return res.status(200).json(status200)

            } catch (error) {
                console.log(error);

                conn.rollback((err) => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })

    })

}

const promise_RegisterProvider = (usuario: number, antecedentes: string, cedula: string, conn: any): Promise<string> => {

    let query: string = "INSERT INTO Provedor SET ? "

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario, antecedentes, cedula }, (err: MysqlError, result: any[]) => {

            try {

                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        resolve("ER_DUP_ENTRY")
                    }
                    throw err.sqlMessage
                }

                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })
}


const promise_AreaProv = (usuario: number, area: string, conn: any): Promise<string> => {

    let query = "INSERT INTO AreaProve SET ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario, area }, (err: MysqlError, result: any[]) => {
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