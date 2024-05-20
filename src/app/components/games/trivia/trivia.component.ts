import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TriviaComponent implements OnInit, OnDestroy{
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
  public imgQuestion: string | undefined;

  /**
   *
   */
  constructor(private triviaService: TriviaService) {}

  /**
   * Con el destroy limpio el
   * intervalo para que no siga corriendo
   * una vez que cambio de componente.
   */
  ngOnDestroy(): void {
    if(this.intervalo) clearInterval(this.intervalo)
  }
  
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

  /***
   * Para la next question
   * porque si reutilizo el
   * start pierdo el contador.
   */
  next(): void{
    this.estado = true;
    this.segundosCont = 40;
    this.selectQuestion();
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
    //-->Tengo que tener cuidado con el texto, a veces viene MAL asi q lo arreglo
    this.pregunta = this.triviaService.fixText(this.preguntaElegida.results[0].question);

    //-->A estas respuestas incorrectas
    this.opcionesPregunta = this.preguntaElegida.results[0].incorrect_answers;
    console.log('Incorrect answerts: ', this.opcionesPregunta);
    //-->Se le debe de sumar la correcta:
    this.opcionesPregunta.push(this.preguntaElegida.results[0].correct_answer);
    this.preguntaElegida.results[0].correct_answer = this.triviaService.fixText(this.preguntaElegida.results[0].correct_answer);
    for (let index = 0; index < this.opcionesPregunta.length; index++) {
      this.opcionesPregunta[index] = this.triviaService.fixText(this.opcionesPregunta[index]);
    }
    //--->Sort de las pregunstas
    this.opcionesPregunta.sort(() => { return Math.random() - 0.5; });

    //--->Se debera de mostrar una imagen
    this.triviaService
    .getImageRelated(this.pregunta)
    .subscribe((e) =>{
      this.imgQuestion = e['photos'][0]['src']['landscape'];
      // this.imgQuestion = e.data[0].url; 
    });
  }

  /**
   * El usuario seleccionara una opcion y
   * se vera si es correcta. Una vez que
   * el usuario llegue a los 25 puntos gana
   * y se reinicia la partida.
   * Mientras no gane se le seguira generando 0
   * mas preguntas traidas de la API
   * @param option la respuesta
   * elegida por el usuario
   */
  checkCorrectAnswer(option:string): void{
    this.estado = false;
    //-->Chequeo que la opcion seleccionada coincida con el 
    //-->correcto de la trivia
    if(option == this.preguntaElegida.results[0].correct_answer){
      this.contadorRtaCorrectas++;//--->Suma puntos
      if(this.contadorRtaCorrectas == 25){//-->Si llega a 25pts gana
        Swal.fire({
          title: 'Ganaste la partida!',
          text: 'Haz llegado al maximo de respuestas correctas, estas en racha!',
          icon: 'success',
          confirmButtonText:'Ok'
        });
      }
      else
        this.next();//-->Si todavia no llega, sigo generando preguntas
    }
    else{
      Swal.fire({
        title: 'Respuesta incorrecta!',
        text: 'La respuesta correcta era: ' + this.preguntaElegida.results[0].correct_answer,
        icon: 'error',
        confirmButtonText:'Ok'
      })
      .then(() => this.start());//-->inicio la partida nuevamente
    }
  }
}
