import { Router } from "express";
/**Segure */
import AuthToken from "../Secure/Auth";
import { entryApiApk } from "../Secure/Validator";
/**Controller */
import Area from "../controllers/Apk/Area";
import Notificacion from "../controllers/Apk/Notificacion";
import NewNotification from "../controllers/Apk/NewNotificacion";
import SendMessage from "../controllers/Apk/SendMessages";
import Obtener_Sala_Message from "../controllers/Apk/ObtSalaMessage";
import Conversacion from "../controllers/Apk/Conversacion";
import SalasConversacionUser from "../controllers/Apk/SalasConversacion";
import SingIn from "../controllers/Apk/singIn";
import RegisterIn from "../controllers/Apk/registerIn";
import IsExistUser from "../controllers/Apk/isExists";
import IsProvider from "../controllers/Apk/isProvider";
import PerfilUser from "../controllers/Apk/perfilUser";
import RegisterProvider from "../controllers/Apk/registerProvider";
import Ranking from "../controllers/Apk/ranking"
import CalificarUser from "../controllers/Apk/calificar";
import EditUser from "../controllers/Apk/editUser";

const root = Router()
let { Salas_Conversacion, EntrySecurity, entrySingIng, entryRegisterProvider, EntryRankin, EntryCalificar,
     EntryEditUSer, EntryRegisterIn,entryConversacion,entryNotificacion } = entryApiApk


root.get('/area', Area)
root.get('/notificacions', AuthToken, Notificacion)
root.get('/conversacion', AuthToken, Conversacion)
root.get('/salas_conversacion', Salas_Conversacion, EntrySecurity, AuthToken, SalasConversacionUser)
root.get('/is_provider', AuthToken, IsProvider)
root.get('/perfil_user', AuthToken, PerfilUser)
root.get('/is_exists', IsExistUser)
root.get('/rankings', EntryRankin, EntrySecurity, Ranking)

root.post('/new_notificacion',entryNotificacion,EntrySecurity, AuthToken, NewNotification)
root.post('/sendMessage', AuthToken, SendMessage)
root.post('/sala_conversacion',entryConversacion,EntrySecurity, AuthToken, Obtener_Sala_Message)
root.post('/register_provider', entryRegisterProvider, EntrySecurity, AuthToken, RegisterProvider)
root.post('/calificar', EntryCalificar, EntrySecurity, CalificarUser)
root.post('/register_in', EntryRegisterIn, EntrySecurity, RegisterIn)
root.post('/singin', entrySingIng, EntrySecurity, SingIn)


//**Put */
root.put('/edit_user', EntryEditUSer, EntrySecurity, AuthToken, EditUser)
export default root
