import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trivia } from '../interfaces/trivia.interface';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private httpClient: HttpClient) { }

  private readonly AUTHORIZATION_KEY_IMG = 'zGrDxXymW8heMqxlt8EfoEurQtuyTVJV9zSaVzUsSuoewNQu0f2zpF0Q';
  private readonly API_URL_QUESTION = 'https://opentdb.com/api.php?amount=1&category=23&difficulty=medium&type=multiple';

  /**
   * Me permitira obtener una pregunta de una API
   * y retornarla para el juego de preguntados.
   * @returns Retornara una Trivia, una pregunta
   * con los atributos de la API
   */
  getQuestion(): Observable<Trivia>{
    return this.httpClient.get(this.API_URL_QUESTION) as Observable<Trivia>;
  }

  getImageRelated(q: string) : Observable<any>{
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.AUTHORIZATION_KEY_IMG
    });
    const requestOptions = { headers: header };
    return this.httpClient.get(`https://api.pexels.com/v1/search?query=History${q}&per_page=1`, requestOptions) as Observable<any>;
  }

  /**
   * Como de la api lo trae mal y con caracteres
   * uso esto para arreglarlo. La mayoria sino, no 
   * se entienden.
   * @param text el texto que vendra mal
   * @returns el texto ya modificado
   */
  fixText(text: string): string{
    return text
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&deg;/g, '°')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&apos;/g, "'")
    // .replace(/&amp;/g, 'and')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&amp;/g, '&')
    .replace(/&auml;/g, 'ä')
    .replace(/&euml;/g, 'ë')
    .replace(/&iuml;/g, 'ï')
    .replace(/&ouml;/g, 'ö')
    .replace(/&uuml;/g, 'ü')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&Euml;/g, 'Ë')
    .replace(/&Iuml;/g, 'Ï')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&Uuml;/g, 'Ü');
  }
}
