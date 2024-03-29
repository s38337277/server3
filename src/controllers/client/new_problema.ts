import { Request, Response } from "express";

import connection from "../../connection/mysql";
import { status500, status400, status413 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";
import { MysqlError } from "mysql";


type Bodys = {
    cliente: number                     /**Id del cliente */
    descripcion: string,
    area: string
    lactitud: number
    longitud: number
    ciudad: string
    calendario: string
    hora: string | null
    problema: number
}



export default function New_Problema(req: Request, res: Response) {
    connection.getConnection((err, conn) => {

        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async (err) => {
            try {

                let { descripcion, area, calendario, hora, lactitud, longitud, ciudad } = req.body as Bodys

                let idUser: number = await headerToken(req) /**ID del usuario */

                if (descripcion.length > 450) {
                    conn.release()
                    return res.status(413).json(status413)
                }

                let oks = await resolve_newProblema(idUser, descripcion, area, conn)
                let problema = await resolve_Problema(idUser, descripcion, area, conn)

                let ubicacion = await resolve_Resolucion(lactitud, longitud, ciudad, problema, calendario, hora, conn)


                conn.commit()
                conn.release()
                return res.status(200).json({problema})

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






const resolve_newProblema = (cliente: number, descripcion: string, area: string, conn: any): Promise<string> => {

    let query: string = "Insert into Problema set ?"

    return new Promise((resolve, reject) => {
        conn.query(query,
            { cliente, descripcion, area: area }, (err: MysqlError, result: any[]) => {

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



const resolve_Problema = (cliente: number, descripcion: string, area: string, conn: any): Promise<number> => {

    let query = `
    SELECT 
        id 
    from Problema 
    WHERE 
        cliente = ?  and descripcion = ? and area = ? AND  inicio >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)  
    ORDER BY inicio DESC LIMIT 1
    `

    return new Promise((resolve, reject) => {
        conn.query(query, [cliente, descripcion, area], (err: any, result: any) => {
            try {

                if (err)
                    throw err.sqlMessage

                let id = result[0].id
                console.log(id)
                resolve(id)
            } catch (error) {
                reject(error)
            }
        })
    })
}


const resolve_Resolucion = (lactitud: number, longitud: number, ciudad: string, problema: number,
    calendario: string, hora: string | null, conn: any): Promise<string> => {

    let query: string = "INSERT INTO AgendaProblema set ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { problema, lactitud, longitud, ciudad, calendario, hora }, (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}

