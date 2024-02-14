import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";


export default function Imagen(req: Request, res: Response) {
    connection.getConnection((err, conn) => {

        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async errT => {
            try {

                const { imagen } = req.body as { imagen: string[] }

                const userID: number = await headerToken(req)

                const deleteQuey: string = await deleteImg(userID, conn)

                for (let index = 0; index < imagen.length; index++) {
                    let url = imagen[index];

                    let sqlInsert = await insertImg(url, userID, conn);
                }

                conn.commit(function (errs) {
                    if (errs)
                        return conn.rollback(err => err);
                });
                conn.release()
                return res.status(200).json("Ok");

            } catch (error) {
                conn.rollback(err => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })

    })
}

const insertImg = (url: string, provedor: number, conn: any): Promise<string> => {
    let sqlInsert: string = "insert into ImagenProv set ? ";

    return new Promise((resolve, reject) => {

        conn.query(sqlInsert, { provedor, url }, (err: MysqlError, result: any[]) => {
            try {

                if (err) {
                    throw err.sqlMessage
                }

                resolve("succes")

            } catch (error) {
                reject(error)
            }
        })

    })
}


const deleteImg = (provedor: number, conn: any): Promise<string> => {

    let sqlQuery: string = "Delete from ImagenProv WHERE provedor = ?"

    return new Promise((resolve, reject) => {

        conn.query(sqlQuery, provedor, (err: MysqlError, conn: any) => {
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