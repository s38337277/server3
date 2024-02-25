import { validationResult, body, query, param } from "express-validator";
import { Response, Request, NextFunction } from "express"

class ValidationEntry {

  constructor() { }

  EntrySecurity(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

/*    
         console.log(req.body)
        console.log(errors)
  */       
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next()
  }
}


class Client extends ValidationEntry {

  constructor() {
    super()

  }

  /**Aceptar propuesta del problema */
  AceptarPropuesta = [
    body('id').notEmpty().isInt({ gt: 0 })
  ]

  /**Detalle de solicitud o de problema */
  Detalle = [
    param('id').notEmpty().isInt({ gt: 0 })
  ]

  PropuestaEntry = [
    query('estado').isString(),
    query('filter').optional().isString()
  ]

  /**Nuevo problema */
  NewProblema = [
    body('descripcion').trim().notEmpty(),
    body('area').trim().notEmpty(),
    body('lactitud').isNumeric(),
    body('calendario').optional().trim(),
    body('hora').trim().optional().trim(),
  ]

}

class Provider extends ValidationEntry {

  constructor() {
    super()
  }

  TareaFinalizada = [
    body('problema').notEmpty().isInt({ gt: 0 }),
    body('propuesta').notEmpty().isInt({ gt: 0 })
  ]

  Detalle1 = [
    param('problemID').notEmpty().isInt({ gt: 0 })
  ]

  Detalle = [
    param('id').notEmpty().isInt({ gt: 0 })
  ]

  AddPropuesta = [
    body('problema').notEmpty().isInt({ gt: 0 }),
    body('descripcion').trim().notEmpty(),
    body('precio').notEmpty().isInt({ gt: 0 }),
  ]
}


class ApiApk extends ValidationEntry {
  constructor() {
    super()
  }

  entryRegister = [
    body('email').notEmpty().isEmail().withMessage('No cumple con el parametro email'),
    body('password').notEmpty().isString().withMessage("No cumple con el parametro password"),
    body('usuario').notEmpty().withMessage("No cumple con el parametro usuario"),
    body('fechaNacimiento').notEmpty()
      .custom(isDateValid)
      .withMessage("No cumple con el parametro fecha nacimientos")

  ]

  entrySingIng = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString().custom(validarEntrysValuer)
  ]

  Salas_Conversacion = [
    query('typeUser').notEmpty().isIn(['proveedor', 'cliente'])
  ]

  entryConversacion = [
    body('userTypes').notEmpty().isIn(['proveedor', 'cliente']),
    body('usuario').isString()
  ]

  entryRegisterProvider = [
    body('antecedentes').notEmpty().isString(),
    body('cedula').notEmpty().isString(),
    body('area').notEmpty().isString()
  ]

  EntryRankin = [
    query('typeUser').notEmpty().isIn(['proveedor', 'cliente'])
  ]

  entryNotificacion = [
    body('usuario').isString(),
    body('title').isString(),
    body('descripcion').isString(),
    body('tipoUser').isIn(['cliente', 'proveedor'])
  ]

  EntryCalificar = [
    body('usuario').notEmpty().isString(),
    body('typeUser').notEmpty().isIn(['proveedor', 'cliente']),
    body('solicitud').notEmpty().isNumeric(),
    body('comentario').notEmpty().isString(),
    body('estrella').notEmpty().isNumeric(),
  ]

  EntryEditUSer = [
    body('imgPerfil').notEmpty().isString(),
    body('fechaNacimiento').notEmpty().custom(isDateValid),
    body('pais').notEmpty().isString(),
    body('ciudad').notEmpty().isString(),
    body('genero').notEmpty().isIn(["hombre", "mujer"]),
    body('informacion').optional().isString()
  ]

  EntryRegisterIn = [
    body('usuario').notEmpty().isString(),
    body('password').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('fechaNacimiento').notEmpty().custom(isDateValid),
    body('ciudad').notEmpty().isString(),
    body('genero').notEmpty().custom(validarGenero)
  ]
}


const isDateValid = (value: string) => {
  // Verificar el formato "YYYY-MM-DD"
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Formato de fecha incorrecto. Utilice YYYY-MM-DD');
  }

  // Extraer año, mes y día
  const [year, month, day] = value.split('-');

  // Crear un objeto de fecha y verificar si es una fecha válida
  const dateObject = new Date(`${year}-${month}-${day}`);
  if (
    isNaN(dateObject.getFullYear()) ||
    isNaN(dateObject.getMonth() + 1) ||
    isNaN(dateObject.getDate())
  ) {
    throw new Error('Fecha no válida');
  }

  return true;
};

const validarEntrysValuer = (value: string): boolean => {

  // Expresión regular para caracteres especiales
  const caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Expresión regular para el patrón "1 or 1"
  const patronUnoOrUno = /\b1\s*or\s*1\b/i;

  // Verificar caracteres especiales
  if (caracteresEspeciales.test(value)) {
    return false;
  }

  // Verificar el patrón "1 or 1"
  if (patronUnoOrUno.test(value)) {
    return false;
  }

  // Si no hay problemas, la entrada es válida
  return true;

}


const validarGenero = (palabra: string): boolean => {
  // Convertir la palabra a minúsculas para hacer la comparación insensible a mayúsculas
  const genero: string = palabra.toLowerCase();

  // Verificar si la palabra es "hombre" o "mujer"
  if (genero === "hombre" || genero === "mujer" || genero === "otros") {
    console.log(true);

    return true;
  } else {
    return false;
  }
}


//problema, descripcion, precio 

export const entryProvider = new Provider()
export const entryClient = new Client()
export const entryApiApk = new ApiApk()
