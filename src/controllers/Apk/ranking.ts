import { Response, Request } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { headerToken } from "../../utils/token";
import { status400, status500 } from "../../utils/statusCode";


type Params = {
    typeUser: "cliente" | "proveedor"
}

type Element = {
    ranking: number,
    usuarios: number
}

export default function Rankings(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {

            let { typeUser } = req.query as Params
            let userId: number = await headerToken(req)
            let ranking = await promise_Ranking(userId, typeUser, conn)
            let star = await promise_Star(userId, typeUser, conn)
            conn.release()
            return res.status(200).json({ ranking, star })

        } catch (error) {
            conn.release()
            return res.status(400).json(status400)
        }

    })
}

const promise_Ranking = (idUser: number, typeUser: "cliente" | "proveedor", conn: any): Promise<Element | string> => {

    let query = "SELECT ROUND(AVG(estrella),2) as ranking, COUNT(*) as usuarios FROM Calificacion WHERE usuario = ? and typeUSer = ? Limit 1"

    return new Promise((resolve, rejects) => {
        conn.query(query, [idUser, typeUser], (err: MysqlError, results: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage
                let { ranking, usuarios } = results[0]
                resolve({
                    ranking, usuarios
                })
            } catch (error) {
                console.log(error);

                rejects(error)
            }
        })
    })
}

const promise_Star = (idUser: number, typeUser: "cliente" | "proveedor", conn: any): Promise<any> => {

    let query = "SELECT estrella, COUNT(*) cantidad FROM Calificacion where usuario = ? and typeUSer = ?  GROUP BY estrella ORDER BY estrella DESC"

    return new Promise((resolve, rejects) => {
        conn.query(query, [idUser, typeUser], (err: MysqlError, results: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                resolve(results)
            } catch (error) {
                console.log(error);

                rejects(error)
            }
        })
    })
}
