import { Router } from "express";
/**Segure */
import AuthToken from "../Secure/Auth";
import { entryProvider } from "../Secure/Validator";
/**Controles */
import Problemas from "../controllers/provider/Problemas";
import CreatePropuesta from "../controllers/provider/guardar_propuesta";
import problema from "../controllers/provider/problema";
import Propuestas from "../controllers/provider/Propuestas";
import Propuesta from "../controllers/provider/propuesta";
import Ganancias from "../controllers/provider/Transaccion";
import Tareas from "../controllers/provider/tareas";
import Tarea_Finalizada from "../controllers/provider/tarea_finalizar";
import PerfilUser from "../controllers/provider/perfilUse";
import Imagen from "../controllers/provider/imagen";




const provider = Router()
const { TareaFinalizada, AddPropuesta, Detalle1, Detalle, EntrySecurity } = entryProvider

provider.get('/problemas', AuthToken, Problemas)
provider.get('/problema/:id', Detalle, EntrySecurity, AuthToken, problema)
provider.get('/propuestas', AuthToken, Propuestas)
provider.get('/ganancias', AuthToken, Ganancias)
provider.get('/Tareas', AuthToken, Tareas)
provider.get('/propuesta/:problemID', Detalle1, EntrySecurity, AuthToken, Propuesta)
provider.get('/perfil_user', AuthToken, PerfilUser)

provider.post('/create_propuesta', AuthToken, CreatePropuesta)
provider.post('/imagen', AuthToken, Imagen)

provider.post('/tarea_finalizada', TareaFinalizada, EntrySecurity, AuthToken, Tarea_Finalizada)


export default provider

