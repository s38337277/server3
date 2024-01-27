import { rejects } from "assert"
import { verifyToken } from "./token"

export const searchIdSocket = (idUser: string, onlineUsers: Map<string, string>): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {

            let userID: string = await verifyToken(typeof idUser === "string" ? idUser : '')
            let array: string | undefined = Array.from(onlineUsers.keys()).find(e => e.toString() === `${userID}`)

            if (userID === "error")
                throw userID

            console.log(userID);

            if (typeof array === "undefined")
                throw ""

            let auxSocket: string | undefined = onlineUsers.get(array)

            if (typeof auxSocket === "undefined")
                throw ""
            resolve(auxSocket)

        } catch (error) {
            console.log(error);

            reject("No se a encontrado la ruta")
        }
    })
}