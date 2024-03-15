

/**
 * 
 * @param fileName (nombre del archivo en S3)
 * @param filePath (ruta local del archivo que se va a carga)
 * @param bucketName 
 * @returns 
 */

/*
export const uploadFileToS3 = (fileName: string, filePath: string): Promise<AWS.S3.ManagedUpload.SendData> => {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                reject(`Error al leer el archivo: ${err.message}`);
                return;
            }

            const params: AWS.S3.PutObjectRequest = {
                Bucket: bucketName,
                Key: fileName,
                Body: fileContent
            };

            s3.upload(params, (uploadErr, data) => {
                if (uploadErr) {
                    reject(`Error al cargar el archivo en S3: ${uploadErr.message}`);
                    return;
                }

                resolve(data);
            });
        });
    });
}


export const  deleteFileFromS3 = async (fileName: string): Promise<string> =>{
    try {
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: bucketName,
            Key: fileName
        };

        await s3.deleteObject(params).promise();

        return (`Archivo '${fileName}' eliminado exitosamente de S3.`)
    } catch (error) {

        throw `Error al eliminar el archivo de S3: ${error}`;
    }
}

*/


import { S3 } from "aws-sdk"

import { s3 } from "./Auth"

const bucketName: string = 'ozbras-soruces' //(nombre del bucket de S3 al que se cargará el archivo)



export const uploadFileToS3 = async (buffer: any, nombreArchivo: string, types: string): Promise<string> => {

    const params: S3.PutObjectRequest = {
        Bucket: bucketName,
        Key: nombreArchivo,
        Body: buffer,
        ContentType: types
    }

    try {
        const response = await s3.upload(params).promise();

        let { Location } = response

        return Location
        // 'response.Location' contiene la URL pública de la imagen en S3
    } catch (error) {
        console.log(error)
        throw error
    }


}



export const deleteFileToS3 = async (nombreArchivo: string): Promise<string> => {
    const params: S3.DeleteObjectRequest = {
        Bucket: bucketName, // Nombre del bucket en S3
        Key: nombreArchivo // Nombre del archivo que se eliminará de S3
    };

    try {
        await s3.deleteObject(params).promise();
        
        return "ok";

    } catch (error) {

        throw error
    }
};