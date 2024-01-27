import { Server, Socket } from 'socket.io';

import { searchIdSocket } from '../utils/socketKit';

export default function Sockets_Clients(io: Server, socket: Socket, onlineUser: Map<string, string>) {

    socket.on('Aceptar_Propuesta', async (e) => {

        try {
            let { content, idUser } = e

            let auxSocket: string = await searchIdSocket(idUser, onlineUser)

            io.to(auxSocket).emit('propuesta_Aceptada', content)

        } catch (error) {

        }
    })

    socket.on('Problema_resuelto', async (e) => {

        try {
            let { content, idUser } = e

            let auxSocket: string = await searchIdSocket(idUser, onlineUser)
            
            io.to(auxSocket).emit('propuesta_Aceptada', content)

        } catch (error) {

        }
    })

    socket.on('Aceptar_Solicitud', async (e) => {
        try {
            let { idUser, provedor } = e
            
            let auxSocket = await searchIdSocket(idUser, onlineUser)
            
            io.to(auxSocket).emit("Validar_Solicitud", ({ message: `: El problema que asignaste a ${provedor} ha sido exitosamente resuelto` }))

        } catch (error) {
            console.log(error);
            
            console.log("No se pudo guardar el socket ", socket.id);

        }
    })


    
}