import { Response, Request } from "express";
import { MysqlError } from "mysql";
import connection from "../../connection/mysql";

import { status500, status400 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";


export default function Propuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        try {
            if (err)
                return res.status(500).json(status500)

            let userId: number = await headerToken(req)
            let problemId: number = Number(req.params.problemID)

            let propuesta = await promise_Propuesta(problemId, userId, conn)

            conn.release()
            return res.status(200).json({propuesta})


        } catch (error) {
            console.log(error);
            conn.release()
            return res.status(400).json(status400)

        }
    })
}

let promise_Propuesta = (problema: number, provedor: number, conn: any): Promise<null | object | string> => {

    let query = " Select id as propuesta_ID ,precio,descripcion,creaacion as creacion, estado,problema as problema_ID from `Solicitud` WHERE provedor = ? and problema = ? Limit 1  "
   
    return new Promise((resolve, reject) => {
        conn.query(query, [provedor, problema], (err: MysqlError, result: object[]) => {
            try {
                if (err){
                console.log(err.sql);
                
                    throw err.sqlMessage
                }
          
                if (result.length === 0)
                    resolve(null)

                let element = result[0]
                resolve(element)
            } catch (error) {
                reject(error)
            }
        })

    })
}