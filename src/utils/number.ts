
export const generarNumeroAleatorio = (): number => {
    // Generar un número aleatorio entre 10000 y 90000
    return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
}
