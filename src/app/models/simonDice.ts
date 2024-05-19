export const START_CONTADOR = 2;

export enum Colores{
    red,
    green,
    blue,
    yellow
}

/**
 * Para ayudar con el prendido
 * y apagado de las luces del simon dice
 * @param time 
 * @returns 
 */
export const sleep = async (time: number) => {
    return new Promise(res => setTimeout(res, time))
}