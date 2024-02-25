import { Response, Request } from "express";
import { MysqlError } from "mysql";

import { status500, status400, status200 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";




interface Bodys {
    antecedentes: string
    cedula: string
    ciudad: string
    area: string
}


export default function Register_Provider(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        conn.beginTransaction(async errT => {

            if (errT) {
                conn.release()
                return res.status(500).json(status500)
            }

            try {
                let { antecedentes, cedula, ciudad, area } = req.body as Bodys
                let idUser: number = await headerToken(req)
                console.log(idUser)
                const element = await promise_Provider(idUser, antecedentes, cedula, ciudad, conn)
                const element2 = await promise_Area(idUser, area, conn)

                conn.commit()
                conn.release()
                return res.status(200).json(status200)

            } catch (error) {
                console.log(error);
                
                conn.rollback(err => err)
                conn.release()
                return res.status(400).json(status400)
            }
        })
    })

}



const promise_Provider = (idUser: number, antecedentes: string, cedula: string, ciudad: string, conn: any): Promise<any> => {

    let query: string = "Insert into Provedor set ?"
    let estado: string = "inscripción"

    return new Promise((resolves, rejects) => {
        conn.query(query, { usuario: idUser, antecedentes, cedula, ciudad, estado }, (err: MysqlError, result: any) => {

            try {
                if (err)
                    throw err.sqlMessage
                resolves("ok")
            } catch (error) {
                rejects(error)
            }

        })
    })
}


const promise_Area = (idUser: number, area: string, conn: any): Promise<any> => {

    let query: string = "Insert Into AreaProve set ?"

    return new Promise((resolve, reject) => {
        conn.query(query, { usuario: idUser, area }, (err: MysqlError, result: any) => {
            try {
                if (err)
                    throw err.sqlMessage

                resolve("ok")
            } catch (error) {
                console.log(error);
                
                reject(error)
            }
        })
    })
}