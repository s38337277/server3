import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/token';
import { searchIdSocket } from '../utils/socketKit';

export default function IndexIos(io: Server, socket: Socket, onlineUsers: Map<string, string>) {

    socket.on('Connect', async (e) => {
        try {
            let { idUser } = e
            let { id } = socket

            let userID: string = await verifyToken(typeof idUser === "string" ? idUser : '')
            if (userID === "error")
                throw userID

            console.log(userID);

            onlineUsers.set(userID, id)

        } catch (error) {
            console.log("No se pudo guardar el socket ", socket.id);

        }
        //onlineUsers.set(idUser, id)
    })

    socket.on("disconnect", (reason) => {
        console.log("Socket desconectado ", socket.id)


        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key);
            }
        });

    });

    socket.on("Message_Emisor", async (e) => {
        let { idUser, message, sala } = e
        try {

            let auxSocket:string = await searchIdSocket(idUser,onlineUsers)

            io.to(auxSocket).emit("Message_Receptor", ({ message, sala }))
        } catch (error) {

        }

    })


}