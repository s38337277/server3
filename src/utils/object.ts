

const jsonVacio = {};
const jsonNoVacio = { clave: 'valor' };


export const JSONEmpty = (json: Object): boolean => Object.keys(json).length == 0

