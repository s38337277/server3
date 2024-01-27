import { Request, Response } from "express";


import { status500, status400 } from "../../utils/statusCode";
import { headerToken, setToken } from "../../utils/token";
import connection from "../../connection/mysql";
import { MysqlError } from "mysql";



type Params = {
    estado: "espera" | "aceptado",
    filter: string
}




export default function Propuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err) {
            return res.status(500).json(status500)
        }

        try {

            let userID: number = await headerToken(req)
            let tokenUser: string = await setToken(userID)
            let { estado, filter } = req.query as Params

            if (filter) {
                let Solicituds = await Filtro(userID, estado, filter, conn)

                conn.release()
                return res.status(200).json({
                    Solicituds
                })
            }


            let areas = await group_solicitud(userID, estado, conn)
            let Solicituds = await lista_solicitud(userID, estado, conn)

            conn.release()
            return res.status(200).json({
                areas, Solicituds, tokenUser
            })

        } catch (error) {
            conn.release()
            console.log(error)
            return res.status(400).json(status400)
        }

    })
}



const group_solicitud = async (userID: number, estado: string, conn: any): Promise<any> => {

    const query = "SELECT " +
        "Problema.area as cargo, " +
        "COUNT(*) as cantidad " +
        "FROM Solicitud " +
        "inner join Problema on Solicitud.problema = Problema.id " +
        "WHERE " +
        "Problema.cliente = ? " +
        "and Solicitud.estado "

    const groupBY: string = "GROUP BY Problema.area ORDER BY Problema.area DESC LIMIT 35 "

    let auxQuery: string = estado === "espera" ? query.concat("in ('espera','deposito')") : query.concat("not in ('espera','deposito')")

    return new Promise((resolve, reject) => {
        conn.query(auxQuery.concat(groupBY), [userID, estado], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                resolve(result)

            } catch (error) {
                reject(error)
            }
        })
    })

}

const Filtro = (userID: number, estado: string, filter: string, conn: any): Promise<any> => {
    const query: string = "SELECT " +
        "Solicitud.id, " +
        "Solicitud.precio, " +
        "Solicitud.descripcion, " +
        "Problema.area, " +
        "Solicitud.estado, " +
        "Usuarios.usuario, " +
        "Usuarios.imgPerfil " +
        "from Solicitud " +
        "INNER JOIN Problema on Solicitud.problema = Problema.id " +
        "INNER JOIN Usuarios on Usuarios.id = Solicitud.provedor " +
        "WHERE Problema.cliente = ? and Problema.area = ?  and  Solicitud.estado  "

    let auxQuery: string = estado === "espera" ? query.concat("in ('espera','deposito')") : query.concat("not in ('espera','deposito')")


    return new Promise((resolve, reject) => {
        conn.query(auxQuery, [userID, filter, estado], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                resolve(result)

            } catch (error) {
                reject(error)
            }
        })
    })
}



const lista_solicitud = async (id: number, estado: string, conn: any): Promise<any> => {

    const query = "SELECT " +
        "Solicitud.id, " +
        "Solicitud.precio, " +
        "Solicitud.descripcion, " +
        "Problema.area, " +
        "Usuarios.usuario, " +
        "Solicitud.estado, " +
        "Usuarios.imgPerfil, " +
        "Solicitud.creaacion  as creacion " +
        "from Solicitud " +
        "INNER JOIN Problema on Solicitud.problema = Problema.id " +
        "INNER JOIN Usuarios on Usuarios.id = Solicitud.provedor " +
        "WHERE Problema.cliente = ? and  Solicitud.estado "

    let order: string = "ORDER BY Solicitud.creaacion DESC LIMIT 40;"

    let auxQuery: string = estado === "espera" ? query.concat("in ('espera','deposito')") : query.concat("not in ('espera','deposito')")

    return new Promise((resolve, reject) => {
        conn.query(auxQuery, [id, estado], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                resolve(result)

            } catch (error) {
                reject(error)
            }
        })
    })
}

