import { configDotenv } from "dotenv";
import { Request } from "express";
import { sign, verify } from "jsonwebtoken";


export const setToken = async (id: string | number): Promise<string> => {
    const token = await sign({ id: id }, "token-secret", {
        expiresIn: "30d",
    })

    return token
}


export const verifyToken = async (token: string) => {
    try {
        const payload = verify(token, 'token-secret')  // Verifica la clave secreta aquí

        if (typeof payload === "object" && "id" in payload) {
            return payload.id;
        } else {
            throw "error";
        }
    } catch (error) {
        throw "error";
    }
};

export const headerToken = async (req: Request): Promise<number> => {
    let keytoken = req.headers['keytoken']
    let id: number = await verifyToken(typeof keytoken === "string" ? keytoken : '')
    return id
}

/*
let userId: number[] = [2224, 2302, 2829, 3234, 2975, 3106,2209,2302]

let element: { id: number, token: string }[] = [];

(async () => {
    for (let index = 0; index < userId.length; index++) {
        const id: number = userId[index];

        let token = await setToken(id)
        let json = {
            id,
            token
        }

        element.push(json)
    }

    console.log(element)
})()


*/