import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trivia } from '../interfaces/trivia.interface';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Me permitira obtener una pregunta de una API
   * y retornarla para el juego de preguntados.
   * @returns Retornara una Trivia, una pregunta
   * con los atributos de la API
   */
  getQuestion(): Observable<Trivia>{
    return this.httpClient.get('https://opentdb.com/api.php?amount=1') as Observable<Trivia>;
  }
}
