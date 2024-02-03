import { Request, Response } from "express";
import { status500, status400 } from "../../utils/statusCode";
import connection from "../../connection/mysql";
import { headerToken, setToken } from "../../utils/token";
import { MysqlError } from "mysql";

type Params = {
    estado: string,
    filter: string
}

export default function Problemas(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {

        if (err)
            return res.status(500).json(status500)

        try {
            let userId: number = await headerToken(req)
            let key: string = await setToken(userId)

            let problemas = await resolve_Problema(userId, conn)

            conn.release()
            return res.status(200).json({
                problemas,key
            })

        } catch (error) {
            console.log(error)
            conn.release()
            return res.status(400).json(status400)
        }
    })
}



const resolve_Problema = (user: number, conn: any): Promise<any> => {

    const sqlQuery: string = `
    SELECT
        Problema.id,
        Problema.area,
        Problema.descripcion,
        Problema.estado,
        Problema.inicio,
        Usuarios.imgPerfil,
        Usuarios.usuario,
        Usuarios.usuario as nombreUsuario,
        Problema.area as areaProblema,
        Usuarios.usuario,
        AgendaProblema.ciudad,
        Usuarios.id as idUser
    FROM Problema
        INNER JOIN Usuarios ON Problema.cliente = Usuarios.id
        INNER JOIN AgendaProblema ON AgendaProblema.problema = Problema.id
    WHERE Problema.area IN (
            SELECT area
            FROM AreaProve
            WHERE
                AreaProve.usuario = ?
        )
        AND Problema.estado IN ('espera', 'deposito')
      
        AND Problema.cliente != ?
    ORDER BY Problema.inicio DESC
`;

    //agregar despues  AND SOUNDEX(AgendaProblema.ciudad) = SOUNDEX(?)
    return new Promise((resolve, reject) => {
        conn.query(sqlQuery, [user, user], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    console.log(err);

                    throw err.sqlMessage
                }
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

}

const resolve_Ciudad = (user: number, conn: any): Promise<string> => {

    let sqlQuery: string = "SELECT ciudad FROM Usuarios WHERE id = ?"

    return new Promise((resolve, reject) => {
        conn.query(sqlQuery, [user], (err: MysqlError, result: any[]) => {
            try {
                if (err) {

                    throw err.sqlMessage
                }
                let { ciudad } = result[0]
                resolve(ciudad)
            } catch (error) {
                reject(error)
            }
        })
    })

}