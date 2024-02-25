// Importa el módulo de Cloudinary
import * as cloudinary from 'cloudinary';

// Configura Cloudinary con tu información de cuenta
cloudinary.v2.config({
  cloud_name: 'dd7gy1t9p',
  api_key: '166757913783992',
  api_secret: '9NZtDC0dCyOkqRXRKegpxSaZY6E'
});

// Define una función para subir una imagen a Cloudinary
export const subirImagen = (rutaLocal: string) => {
  // Usamos el método `uploader.upload` para subir la imagen
  cloudinary.v2.uploader.upload(rutaLocal, (error, result) => {
    if (error) {
      console.error('Error al subir la imagen:', error);
    } else {
      console.log('Imagen subida exitosamente:', result);
    }
  });
}

// Llama a la función para subir una imagen
subirImagen('./imagenes/Appreciation.png');
