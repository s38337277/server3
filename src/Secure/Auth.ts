import { Request, Response, NextFunction } from "express";
import { status401 } from "../utils/statusCode";
import { verifyToken } from "../utils/token";

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 * 
 * En resumen, este middleware se encarga de verificar la autenticidad de un token de acceso presente en la cabecera 'keytoken' de
 * la solicitud. Si el token es válido, permite que la solicitud continúe hacia el siguiente middleware;
 * de lo contrario, responde con un estado 401.
 */

export default async function AuthToken(req: Request, res: Response, next: NextFunction) {
    try {

        let keytoken = req.headers['keytoken']
        if (!keytoken)
            throw "error"
        if (typeof keytoken === "string") {
            let verify = await verifyToken(keytoken)
            if (verify === "error")
                throw ""
        
        }
       next()

    } catch (error) {
        return res.status(401).json(status401)
    }

}