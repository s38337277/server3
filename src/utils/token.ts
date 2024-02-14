import { configDotenv } from "dotenv";
import { Request } from "express";
import { sign, verify } from "jsonwebtoken";


/**
 * 
 * @param id 
 * @returns 
 * 
 * Esta función toma un ID (cadena o número) como argumento y devuelve una promesa que eventualmente resuelve en un token JWT firmado. 
 * Utiliza el método sign del módulo jsonwebtoken para firmar un objeto que contiene el ID proporcionado. El token se firma utilizando una clave
 * secreta y tiene una duración de 30 días.
 */
export const setToken = async (id: string | number): Promise<string> => {
    const token = await sign({ id: id }, "token-secret", {
        expiresIn: "30d",
    })

    return token
}


/**
 * 
 * @param token 
 * @returns 
 * Esta función toma un token como argumento y devuelve una promesa que eventualmente resuelve en el ID extraído del token. 
 * Utiliza el método verify del módulo jsonwebtoken para verificar la validez del token utilizando la misma clave secreta utilizada para firmarlo.
 * Si el token es válido y contiene un objeto con una propiedad id, devuelve ese ID. En caso de cualquier error durante la verificación, 
 * lanza una excepción.
 */
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


/**
 * 
 * @param req 
 * @returns 
 *  Esta función toma un objeto Request de Express como argumento y devuelve una promesa que eventualmente resuelve en el ID extraído del token de la 
 * cabecera 'keytoken'. Primero, obtiene el valor de la cabecera 'keytoken' del objeto de solicitud req. Luego, llama a la función verifyToken para verificar
 *  y extraer el ID del token. Si el token es válido, devuelve el ID como un número. Si hay algún error durante la verificación del token,
 *  la función lanzará una excepción.
 */
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