export class Hangman{
    /**
     * Funcion que contiene las
     * palabras para el ahoracado
     * @returns el array de palabras
     */
    static getWords() : string[]{
        return [
            "elefante",
            "computadora",
            "pantalla",
            "guitarra",
            "bicicleta",
            "montaña",
            "cascada",
            "caballo",
            "telefono",
            "television",
            "camion",
            "perro",
            "gato",
            "pajaro",
            "jirafa",
            "platano",
            "manzana",
            "naranja",
            "fresa",
            "sandia",
            "banana",
            "kiwi",
            "uva",
            "limon",
            "pomelo",
            "pera",
            "ciruela",
            "melocoton",
            "pimiento"
        ];
    };

    /**
     * 
     * @returns retorna las letras
     * disponibles para que usuario
     * utilice en el ahorcado.
     */
    static getLettersKeyboard() : string[]{
        return [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
        ];
    };
}