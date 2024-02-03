import { Request, Response } from "express";

import connection from "../../connection/mysql";
import { status500, status400,status404 } from "../../utils/statusCode";
import { MysqlError } from "mysql";



export default function problema(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        try {
            if (err)
                return res.status(500).json(status500)

            let id: number = Number(req.params.id)

            let problema = await resolve_problema(id, conn)

            if(typeof problema === "undefined"){    
                conn.release()
                return res.status(404).json(status404)
            }

            let sources = await resolve_Sources(id, conn)
            let agenda = await resolve_Agenda(id, conn)

            conn.release()
            return res.status(200).json({
                problema,
                sources,
                agenda
            })
        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })
}



let resolve_problema = (problema: number, conn: any): Promise<any> => {

    let query = "Select id as problema, area,descripcion,estado,inicio from Problema WHERE id = ? LIMIT 1"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                let element = result[0]
                resolve(element)
            } catch (error) {
                reject(error)
            }
        })
    })
}


let resolve_Sources = (problema: number, conn: any): Promise<any> => {

    let query = "Select url from ImageProblema WHERE problema = ? LIMIT 50"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}

let resolve_Agenda = (problema: number, conn: any): Promise<string> => {

    let query = "Select lactitud,longitud,   calendario, hora from AgendaProblema WHERE problema = ? LIMIT 10"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: any, result: any) => {
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
