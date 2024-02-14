import { Server, Socket } from 'socket.io';
import { searchIdSocket } from '../utils/socketKit';
export default function Sockets_Provider(io: Server, socket: Socket, onlineUsers: Map<string, string>) {

    socket.on('Problema_Resuelto', async (e) => {
        try {
            let { idUser, provedor, message } = e

            let auxSocket = await searchIdSocket(idUser, onlineUsers)

            let title: string = "Problema Resuelto"
            io.to(auxSocket).emit("NotifyClient", ({
                message, title
            }))

        } catch (error) {
            console.log(error);

            console.log("No se pudo guardar el socket ", socket.id);

        }
    })

    socket.on('Nueva_Propuesta', async (e) => {
        try {
            let { idUser, provedor, message } = e


            let auxSocket = await searchIdSocket(idUser, onlineUsers)

            let title: string = "Nueva Propuesta"
            io.to(auxSocket).emit("NotifyClient", ({ message, title }))

        } catch (error) {
            console.log("No se pudo guardar el socket ", socket.id);
        }
    })

}