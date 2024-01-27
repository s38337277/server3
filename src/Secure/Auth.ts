import { Request, Response, NextFunction } from "express";
import { status401 } from "../utils/statusCode";
import { verifyToken } from "../utils/token";

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