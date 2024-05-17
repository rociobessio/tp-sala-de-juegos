import { Component, OnInit } from '@angular/core';
import { Trivia } from '../../../interfaces/trivia.interface';
import { TriviaService } from '../../../services/trivia.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent implements OnInit{
  //-->Manejo de los estados
  public estado: boolean | undefined;

  //-->Para contar los segundos
  public segundosCont: number = 0;
  public intervalo!: any;

  //-->Sobre las preguntas/respuestas
  public pregunta: string | undefined;
  public opcionesPregunta: string[] = [];
  public strImg: string | undefined;
  public preguntaElegida!: Trivia;
  public categoria: string | undefined;
  public contadorRtaCorrectas: number = 0;

  /**
   *
   */
  constructor(private triviaService: TriviaService) {}
  
  /**
   * En el OnInit inicio el tiempo del
   * intervalo que tiene para responder
   * e inicio lo que es la partida y los
   * estados para manejarla.
   */
  ngOnInit(): void {
    this.intervalo = setInterval(() => this.ticTack(), 1000);
    this.start();//-->inicio
  }

  /**
   * En este metodo iniciamos la 
   * partida. Servira para reiniciar
   * los estados de todo, y settear
   * la pregunta.
   */
  start(){
    this.estado = true;//-->Iniciamos
    this.contadorRtaCorrectas = 0;
    this.segundosCont = 40;//-->40 segundos para responder.

    this.selectQuestion();//-->Voy a seleccionar la pregunta nueva
  }

  /**
   * Me permitira ver el estado
   * de la pregunta y controlar
   * los segundos disponibles 
   * para la respuesta.
   */
  private ticTack(): void {
    if (this.estado) {
      if (this.segundosCont == 0) {
        this.estado = false;
        this.restartSeconds();
      } else {
        --this.segundosCont
      }
    }
  }

  /**
   * Funcionara como algo 'recursivo'
   * donde si se paso del tiempo mostrare
   * el sweet alert y luego reiniciare
   * la partida.
   */
  private restartSeconds(): void{
    Swal.fire({
      title: 'Llegaste al limite de tiempo!',
      text: 'Te haz excedido con el tiempo, cuidado.',
      icon: 'warning',
      confirmButtonText: 'Restart'
    })
    .then(() => { this.start();});
  }

  /**
   * Me permitira generar la pregunta
   * y sus atributos a mostrar (opciones,
   * categoria, etc)
   */
  selectQuestion(){
    this.triviaService.getQuestion()
    .subscribe( trivia =>{
      console.log('Respuesta que llega de la API:', trivia);
      this.fillDataQuestion(trivia);
    });
  }

  /**
   * Para fragmentar un poco mas el codigo
   * aca se llenaran los datos sobre la trivia
   * correspondiente.
   * @param trivia Trivia obj que contiene
   * la info de la trivia.
   */
  private fillDataQuestion(trivia: Trivia){
    this.preguntaElegida = trivia;

    this.categoria = this.preguntaElegida.results[0].category;
    //-->Tengo que tener cuidado con el texto, a veces viene MAL
    this.pregunta = this.preguntaElegida.results[0].question;

    //-->A estas respuestas incorrectas
    this.opcionesPregunta = this.preguntaElegida.results[0].incorrect_answers;
    // console.log('Incorrect answerts: ', this.opcionesPregunta);
    //-->Se le debe de sumar la correcta:
    this.opcionesPregunta.push(this.preguntaElegida.results[0].correct_answer);

    // for (let index = 0; index < this.opcionesPregunta.length; index++) {
    //   this.opcionesPregunta[index] 
    // }

    this.opcionesPregunta.sort(() => { return Math.random() - 0.5; });
  }
}
