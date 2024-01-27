import { Router } from "express"

/**Seguridad */
import AuthToken from "../Secure/Auth";
import { entryClient } from "../Secure/Validator";
/**Controlador */
import Propuesta from "../controllers/client/Solicituds";
import propuesta from "../controllers/client/solicitud";
import PublicarProblema from "../controllers/client/new_problema";
import Aprobar_Propuesta from "../controllers/client/aprobar_solicitud";
import Problema from "../controllers/client/Problemas"
import problema from "../controllers/client/problema";
import delete_Problema from "../controllers/client/delete_problema";

const client = Router()
let { AceptarPropuesta, Detalle, NewProblema, PropuestaEntry,
    EntrySecurity } = entryClient



client.get('/propuesta', PropuestaEntry, EntrySecurity, AuthToken, Propuesta)
client.get('/detalle_propuesta/:id', Detalle, EntrySecurity, AuthToken, propuesta)
client.get('/problemas', AuthToken, Problema)
client.get('/detalle_problema/:id', Detalle, EntrySecurity, AuthToken, problema)


client.post('/publicar_problema', NewProblema, EntrySecurity, AuthToken, PublicarProblema)

/**actulizar */
client.post('/aprobar_propuesta', AceptarPropuesta, EntrySecurity, AuthToken, Aprobar_Propuesta)



client.delete('/delete_problema', AuthToken, delete_Problema)

export default client
