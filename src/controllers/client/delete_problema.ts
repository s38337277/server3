import { Request, Response } from "express";
import connection from "../../connection/mysql";
import { status500, status400 } from "../../utils/statusCode";


export default function delete_Problema(req: Request, res: Response) {
    connection.getConnection((err, conn) => {
        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async errT => {
            try {

                if (errT)
                    return res.status(500).json(status500)

                let { id } = req.body as { id: number }

                await resolve_Problema(id, conn)
                await resolve_Sources(id, conn)
                await resolve_Propuestas(id, conn)
                await resolve_Agenda(id, conn)

                conn.commit()
                conn.release()

                return res.status(200).json("ok")


            } catch (error) {
                console.log(error);

                conn.rollback(err => {
                    throw err
                })
                conn.release()
                return res.status(400).json(status400)
            }

        })

    })
}

const resolve_Problema = (id: number, conn: any): Promise<string> => {

    let query = "DELETE FROM Problema WHERE id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}


const resolve_Sources = (problema: number, conn: any): Promise<string> => {

    let query = "Delete from ImageProblema WHERE problema = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}


const resolve_Agenda = (problema: number, conn: any): Promise<string> => {

    let query = "Delete from AgendaProblema WHERE problema = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}


const resolve_Propuestas = (problema: number, conn: any): Promise<string> => {

    let query = "Delete from Solicitud WHERE problema = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [problema], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                resolve("ok")
            } catch (error) {
                reject(error)
            }
        })
    })

}

