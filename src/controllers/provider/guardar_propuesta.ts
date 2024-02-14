import { Request, Response } from "express";
import { MysqlError } from "mysql"
import connection from "../../connection/mysql";
import { status400, status500, status404, status409, status200 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";


type Bodys = {
    problema: number,
    descripcion: string,
    precio: number
}

type Problema_isExist = {
    id: number,
    estado: string,
    status: number
}




export default function NewPropuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {
            const userId: number = await headerToken(req)
            const { problema, descripcion, precio } = req.body as Bodys

            let isExist = await promise_isExist(problema, conn)



            if (typeof isExist === "object") {
                if (isExist.status === 404) {
                    conn.release()
                    return res.status(404).json(status404)
                }

                let { id, estado } = isExist

                let guardar = await promise_guardar(id, userId, precio, descripcion, conn)

                conn.release()
                return res.status(200).json(status200)
            }
        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }

    })
}



const promise_isExist = (problema: number, conn: any): Promise<Problema_isExist | string> => {

    let query = "Select id, estado from Problema WHERE id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, problema, (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                if (result.length === 0) {
                    resolve({
                        id: -1,
                        estado: "",
                        status: 404
                    })
                }
                let { id, estado } = result[0]
                resolve({
                    id, estado, status: 200
                })
            } catch (error) {
                reject(error)
            }
        })
    })

}

const promise_guardar = (problema: number, provedor: number, precio: number, descripcion: string, conn: any): Promise<string> => {
    let query = 'Insert into Solicitud set ? '

    return new Promise((resolve, reject) => {
        conn.query(query, { problema, provedor, precio, descripcion }, (err: MysqlError, result: any) => {
            try {

                if (err)
                    throw err.sqlMessage
                resolve("ok")
            } catch (error) {
                console.log("de")
                reject(error)
            }
        })
    })
}

