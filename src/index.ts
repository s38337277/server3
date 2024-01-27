import express, { urlencoded, json } from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from "http"
import { verifyToken } from './utils/token';
import morgan from 'morgan';
import cors from "cors"
/**Routas */
import client from './routes/client';
import provider from './routes/provider';
import root from './routes/root';
/**IOS */
import Sockets_Provider from './ios/provider';
import Sockets_Clients from './ios/client';
import SocketIOS from './ios/indexIOs'



const app = express();
const port:number = 3030;
const auxMorgan:string = "-IP :remote-addr  -METHOD :method -URL :url -STATUS :status -DATE :date  -TIME :response-time ms  -TAM :res[content-length]"



app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan(auxMorgan))
app.use(cors({
    origin: "*"
}));


app.use('/client', client)
app.use('/provider', provider)
app.use('/', root)


const httpServer = createServer(app);


/**
 * Socketsa
 */
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

// Configurar Socket.IO para generar identificadores únicos con UUID

var onlineUsers = new Map<string, string>(); /**Usuarios en linea */

io.on('connection', (socket: Socket) => {

    console.log(`Socket ${socket.id} iniciado el la ruta http://192.168.100.200:${port}`);


    SocketIOS(io, socket, onlineUsers)
    Sockets_Clients(io, socket, onlineUsers)
    Sockets_Provider(io, socket, onlineUsers)
})

/**Http Servers */
httpServer.listen(port, () => {
    console.log(`Open Server On Port ${port}`);
});

