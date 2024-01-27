import * as crypto from "node:crypto"


const key =  crypto.randomBytes(32);

let iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)


export const encrypt = (value: any): string => {
    let codify = cipher.update(value, 'utf-8', 'hex');
    codify += cipher.final('hex');

    return codify
}

export const decrypt = (value: any): any => {
    let decodify = decipher.update(value, 'hex', 'utf-8')
    decodify += decipher.final('utf-8');
    return decodify
}
/*
let dato = encrypt("120")

console.log(dato);

console.log("Desencriptar: ", decrypt(dato))
*/