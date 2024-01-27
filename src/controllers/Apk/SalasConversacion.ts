import { Request, Response } from "express";
import { MysqlError } from "mysql";

import connection from "../../connection/mysql";
import { status400, status500 } from "../../utils/statusCode";
import { headerToken } from "../../utils/token";

export default function SalasConversacionUser(req: Request, res: Response) {
    connection.getConnection(async (err, conn) => {
        if (err)
            return res.status(500).json(status500)

        try {
            const userID: number = await headerToken(req)
            const { typeUser } = req.query as { typeUser: string }

            let Salas_Conversacion = await promise_Salas_Conversacion(userID, typeUser, conn)

            conn.release()
            return res.status(200).json({ Salas_Conversacion })

        } catch (error) {
            console.log(error);
            
            conn.release()
            return res.status(400).json(status400)
        }
    })
}

/**
 * 
 * @param userID 
 * @param typeUser 
 * @param conn 
 * @returns 
 * 
 * Esta consulta realiza lo siguiente:

Selecciona la información relevante de las tablas Conversacion, Usuarios, y Messages.
Utiliza JOIN para unir las tablas Conversacion y Usuarios dos veces, una para el usuario cliente y otra para el proveedor.
Utiliza LEFT JOIN para unir la tabla Messages y obtener el último mensaje para cada sala.
Utiliza ROW_NUMBER() para numerar los mensajes por sala en orden descendente según la fecha de creación.
Filtra los resultados para incluir solo las salas en las que el usuario específico está involucrado (ya sea como cliente o proveedor).
 */
const promise_Salas_Conversacion = (userID: number, typeUser: string, conn: any): Promise<any> => {

    let query = "SELECT " +
        "c.sala AS SalaID, u.usuario AS UsuarioCliente, p.usuario AS UsuarioProveedor, m.mensaje AS UltimoMensaje, " +
        "u.imgPerfil as imgCliente, p.imgPerfil as imgProveedor, "+
        "m.creates AS FechaUltimoMensaje, c.userCliente, c.userProveedor " +
        "FROM Conversacion c " +
        "JOIN Usuarios u ON c.userCliente = u.id " +
        "JOIN Usuarios p ON c.userProveedor = p.id " +
        "LEFT JOIN (  SELECT sala_id, mensaje, creates, ROW_NUMBER() OVER (PARTITION BY sala_id ORDER BY creates DESC) AS rn FROM Messages) " +
        "m ON c.sala = m.sala_id AND m.rn = 1 WHERE   "

    let querAux: string = typeUser === "cliente" ? query.concat('c.userCliente = ? ') : query.concat('c.userProveedor = ? ')

    return new Promise((resolve, reject) => {
        conn.query(querAux.concat('ORDER BY m.creates DESC'), [userID], (err: MysqlError, result: any[]) => {
            try {
                if (err) {
                    console.log(err);

                    throw err.message
                }

                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

}

