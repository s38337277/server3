import { rejects } from "assert"
import { verifyToken } from "./token"

// Definición de una función llamada searchIdSocket que toma el ID del usuario y un mapa de usuarios en línea como parámetros y devuelve una promesa que eventualmente resuelve con el ID del socket asociado al usuario

export const searchIdSocket = (idUser: string, onlineUsers: Map<string, string>): Promise<string> => {
    return new Promise(async (resolve, reject) => { 
        // Retorna una nueva promesa
        try { // Manejo de errores
        
            let userID: string = await verifyToken(typeof idUser === "string" ? idUser : '') // Verifica el token de usuario

            let array: string | undefined = Array.from(onlineUsers.keys()).find(e => e.toString() === `${userID}`) // Busca el ID de usuario en línea

            if (userID === "error") // Si hay un error en el token, se lanza una excepción
                throw userID

            if (typeof array === "undefined") // Si no se encuentra el usuario en línea, se lanza una excepción
                throw ""

            let auxSocket: string | undefined = onlineUsers.get(array) // Obtiene el socket asociado al usuario

            if (typeof auxSocket === "undefined") // Si no se encuentra el socket asociado, se lanza una excepción
                throw ""

            resolve(auxSocket) // Resuelve la promesa con el ID del socket asociado al usuario
            
        } catch (error) { // Manejo de errores
            reject("No se ha encontrado la ruta") // Rechaza la promesa con un mensaje de error
        }
    })
}