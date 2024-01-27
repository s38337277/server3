import { Response, Request } from "express";
import { MysqlError, PoolCluster } from "mysql";

import connection from "../../connection/mysql";
import { status500, status400, status200 } from "../../utils/statusCode";


export default function Tarea_Finalizada(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {
            let { problema, propuesta } = req.body as { problema: number, propuesta: number }

            let resProblema = await promise_Problema(problema, conn)
            let resSolicitud = await promise_Solictud(propuesta, conn)

            conn.release()
            return res.status(200).json(status200)
        } catch (error) {
            console.log(error);
            conn.release()
            return res.status(400).json(status400)
        }

    })
}




const promise_Problema = (problema: number, conn: any): Promise<string> => {

    let estado = "resuelto"
    let query = "UPDATE Problema SET ? WHERE id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [{ estado }, problema], (err: MysqlError, result: any[]) => {
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

const promise_Solictud = (propuesta: number, conn: any): Promise<string> => {

    let estado:string = "resuelto"
    let updates: Date = new Date()
    let descripcion:string = "descripcion"
    let query:string = "UPDATE Solicitud SET ? WHERE id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [{ estado, updates,descripcion }, propuesta], (err: MysqlError, result: any[]) => {
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