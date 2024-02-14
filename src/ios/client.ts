import { Server, Socket } from 'socket.io';

import { searchIdSocket } from '../utils/socketKit';

export default function Sockets_Clients(io: Server, socket: Socket, onlineUser: Map<string, string>) {



    socket.on('Aceptar_inscripcion', async (e) => {

        try {
            let { content, idUser } = e

            let auxSocket: string = await searchIdSocket(idUser, onlineUser)
            let message:string = "Tu inscripcion a sido exitosa"
            io.to(auxSocket).emit('NotifyClient', {message})

        } catch (error) {

        }
    })





}