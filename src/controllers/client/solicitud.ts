import { Response, Request } from "express";

import { status500, status400, status404 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { setToken } from "../../utils/token";
import { MysqlError } from "mysql";


type typePropuesta = {
    problema: number
    costo: number
    propuesta: number
    descripcion: string
    area: string
    estado: string
    creaacion: string
}

type typeProvedor = {
    imgPerfil: string,
    usuario: string,
    provedor: number | string,
    informacion: string,

}



export default function propuesta(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        try {
            if (err)
                return res.status(500).json(status500)

            let propuesta_id: number = Number(req.params.id)

            let detalle: typePropuesta | string = await resolve_detalle(propuesta_id, conn)

            if (typeof detalle === "string") {
                conn.release()
                return res.status(404).json(status404)
            } else {

                let provider = await resolve_provedor(detalle.propuesta, conn)

                if (typeof provider !== "string") {
                    let ratings = await resolve_ratings(provider.provedor, conn)
                    let sources = await resolve_sources(provider.provedor, conn)

                    conn.release()

                    provider.provedor = await setToken(provider.provedor)

                    return res.status(200).json({
                        detalle,
                        ratings,
                        sources,
                        provider
                    })
                }


                throw ""
            }





        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })
}



const resolve_detalle = (id: number, conn: any): Promise<typePropuesta | string> => {

    const query = "SELECT " +
        "Solicitud.id as propuesta," +
        "Solicitud.problema, " +
        "Solicitud.precio, " +
        "Solicitud.descripcion, " +
        "Problema.area, " +
        "Solicitud.estado, " +
        "Solicitud.creaacion " +
        "FROM Solicitud " +
        "inner join Problema on Solicitud.problema = Problema.id " +
        "inner join Usuarios on Solicitud.provedor = Usuarios.id " +
        "inner join Provedor on Solicitud.provedor = Provedor.usuario " +
        "WHERE " +
        "Solicitud.id = ? " +
        "Limit 1"

    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    throw err.sqlMessage
                }

                if (result.length === 0) {
                    resolve("not found")
                }

                let data = result[0]
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    })
}

const resolve_ratings = (provedor: number | string, conn: any): Promise<any> => {

    let query = "SELECT ROUND(AVG(estrella),1) as estrella,Count(*) as usuarios from Calificacion WHERE usuario = ? and typeUSer = 'proveedor'"

    return new Promise((resolve, reject) => {
        conn.query(query, [provedor], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                let data = result[0]
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    })

}

const resolve_sources = (provedor: number | string, conn: any): Promise<any> => {
    let query = "SELECT url FROM ImagenProv WHERE provedor = ? order by creates DESC LIMIT 15"

    return new Promise((resolve, reject) => {
        conn.query(query, [provedor], (err: any, result: any) => {
            try {
                if (err)
                    throw err.message
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}

const resolve_provedor = (provedor: number, conn: any): Promise<typeProvedor | string> => {

    let query = "SELECT " +
        "   Usuarios.imgPerfil, Usuarios.usuario, Usuarios.id as provedor, Usuarios.correo,Usuarios.genero,  " +
        "   Provedor.informacion " +
        "FROM Solicitud " +
        "inner join Problema on Solicitud.problema = Problema.id " +
        "inner join Usuarios on Solicitud.provedor = Usuarios.id " +
        "inner join Provedor on Solicitud.provedor = Provedor.usuario " +
        "   WHERE Solicitud.id = ? " +
        "Limit 1"


    return new Promise((resolve, reject) => {
        conn.query(query, [provedor], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    console.log(err)
                    throw err
                }
                let data = result[0] as typeProvedor

                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    })

}