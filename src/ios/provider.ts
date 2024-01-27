import { Server, Socket } from 'socket.io';
import { searchIdSocket } from '../utils/socketKit';
export default function Sockets_Provider(io: Server, socket: Socket, onlineUsers: Map<string, string>) {

    socket.on('Problema_Resuelto', async (e) => {
        try {
            let { idUser, provedor } = e
            
            let auxSocket = await searchIdSocket(idUser, onlineUsers)
            
            io.to(auxSocket).emit("Problema_Finalizado", ({ message: `: El problema que asignaste a ${provedor} ha sido exitosamente resuelto` }))

        } catch (error) {
            console.log(error);
            
            console.log("No se pudo guardar el socket ", socket.id);

        }
    })


  

}