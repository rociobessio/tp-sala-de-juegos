export interface Trivia{
    response_code: number;
    results: Results[];//-->El array con el contenido de la trivia
}

/**
 * Tendra que matchear
 * con los atributos
 * del json de la api.
 */
export interface Results{
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}