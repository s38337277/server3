import { Request, Response } from "express";
import connection from "../../connection/mysql";
import { status500, status404, status400 } from "../../utils/statusCode";
import { headerToken, setToken } from "../../utils/token";
import { MysqlError } from "mysql";


export default function problema(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {
            let id_problema: number = Number(req.params.id)

            let problema = await promise_Problema(id_problema, conn)

            if (typeof problema === "object") {
                var { detalle, user } = problema

                let sources = await promise_Source(id_problema, conn)
                let agenda = await promise_Agenda(id_problema, conn)

                conn.release()
                return res.status(200).json({
                    detalle, user, sources, agenda
                })
            }

            return res.status(404).json(status404)

        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })
}


let promise_Problema = (problema: number, conn: any): Promise<{ detalle: any, user: any, status: number } | string> => {

    let query = `
        Select
        Problema.id as problema, Problema.area, Problema.descripcion, Problema.estado, Problema.inicio,Problema.cliente as idUser,
        Usuarios.usuario, Usuarios.imgPerfil
    from Problema
        INNER JOIN Usuarios on Problema.cliente = Usuarios.id
    WHERE
        Problema.id = ?
    LIMIT 1
    `

    return new Promise((resolve, rejects) => {
        conn.query(query, problema, async (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }
                if (result.length === 0) {
                    resolve("not found")
                }

                let { problema, area, descripcion, estado, inicio, usuario, imgPerfil,
                    idUser } = result[0]

                let auxIdUser = await setToken(idUser)


                resolve({
                    user: {
                        usuario, imgPerfil, idUser: auxIdUser
                    },
                    detalle: {
                        problema, area, descripcion, estado, inicio
                    },
                    status: 200
                })

            } catch (error) {
                rejects(error)
            }
        })
    })
}


let promise_Source = (problema: number, conn: any): Promise<any> => {

    let query = "Select url from ImageProblema WHERE problema = ? LIMIT 20"

    return new Promise((resolve, rejects) => {
        conn.query(query, problema, (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                resolve(result)

            } catch (error) {
                rejects(error)
            }
        })
    })
}


let promise_Agenda = (problema: number, conn: any): Promise<any> => {

    let query = "Select calendario,TIME_FORMAT(hora, '%h:%i %p') AS hora, ciudad, lactitud, longitud from AgendaProblema WHERE problema = ? LIMIT 1"

    return new Promise((resolve, rejects) => {
        conn.query(query, problema, (err: MysqlError, result: any[]) => {
            try {
                if (err)
                    throw err.sqlMessage

                let element = result[0]
                resolve(element)

            } catch (error) {
                rejects(error)
            }
        })
    })
}

