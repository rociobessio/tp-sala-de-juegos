import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { START_CONTADOR,Colores } from '../models/simonDice';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SimonDiceService {
  simon: string[] = [];//-->El simon dice donde se guardara la secuencia original
  jugador: string[] = [];//-->El array del jugador (tendra que matchear con el simon)
  contador: number;
  status = new Subject<any>;//-->Para los event emitters!

  /**
   * Inicializara el contador
   */
  constructor() {
    this.contador = START_CONTADOR;
  }

  /**
   * Me permitira obtener un color
   * random de los simon
  */
  private get getRandomColor() : string{
    return Colores[Math.floor(Math.random() * 4)];
  }

  /**
   * Me permitira añadir una nueva secuencia (color)
   * al patron del simon.
   * @param incremento si es true agrego una nueva
   * secuencia, si es false(default) no
   */
  addNewSimon(incremento :boolean = false):void{
    if(incremento){this.contador++;}//-->Sumo el contador
    this.simon.push(this.getRandomColor);//-->Obtengo un color random del array
    this.jugador = [];
  }

  /**
   * Me permitira recorrer contador y añadir
   * la secuencia del simon dice.
   * Setteando un nuevo estado en que se encuentre
   * el jugador/partida.
   * @returns retorna el array del simon dice
   */
  generateSimonSays():string[]{
    for (let index = 0; index < this.contador; index++) {
      this.addNewSimon();
    }
    this.setStates();
    return this.simon;
  }

  /**
   * Me permitira reiniciar el estado del juego,
   * es decir, reinicia el simon, el contador
   * y genera una nueva secuencia.
   * @returns retornara el simon dice
   * con la nueva secuencia dependiendo
   * del contador.
   */
  restartSimon():string[]{
    this.contador = START_CONTADOR;
    this.simon = [];
    return this.generateSimonSays();
  }

  /**
   * Para terminar con la partida
   * del simon dice.
   */
  endSimon() {
    this.contador = START_CONTADOR;
    this.simon = [];
  }

  /**
   * Ira a otra funcion para comparar 
   * si el color seleccionado esta dentro
   * del array del simon, si lo esta
   * cambia el estado, sino lo esta 
   * reiniciara la partida.
   * @param color el color seleccionado
   * por el jugador.
   */
  playerGuess(color: string){
    this.jugador.push(color);
    if(!this.compareSimonWithPlayer()){
      Swal.fire({
        title: 'Fallaste en la secuencia!',
        text: 'Haz juntado ' + this.contador + ' puntos. A seguir intentando!',
        icon: 'error',
        cancelButtonText: 'Ok',
        timer: 5000
      })
      .then(() =>{
        this.jugador = [];
        this.restartSimon();//-->Reinicio el simon
      });
    }
    this.setStates();
  }

  /**
   * Me permitira comparar si la secuencia que va
   * apretando el jugador coincide con la secuencia
   * del simon. Ademas reproducira el sonido de lo
   * que presione. 
   * Si todo sale bien, es decir, coincide toda la secuencia
   * se añade un nuevo color y se reinicia el array
   * del jugador para evitar conflictos. Sino vuelve
   * a comenzar.
   * @returns true si coincide TODA la secuencia,
   * false sino lo hace.
   */
  compareSimonWithPlayer(): boolean{
    for (let index = 0; index < this.jugador.length; index++) {
      //-->No coincide ya una posicion, false
      if(this.jugador[index] !== this.simon[index]){
        return false;
      }
      this.playSound(this.jugador[index]);
    }

    //-->Si coinciden las legths de los arrays
    if(this.jugador.length === this.simon.length){
      this.addNewSimon(true);//-->Añado una nueva secuencia
      this.jugador = [];//-->Vacio su array
    }
    //-->Todo coincide:
    return true;
  }

  /**
   * Como status es un observable, al 
   * llamarlo le paso data cada vez que
   * se actualice
   */
  setStates(){
    // console.log(this.jugador);
    this.status.next({
      jugador: this.jugador,
      simon: this.simon,
      contador: this.contador
    });
  }

  /**
   * Esta funcion servira para agregarle
   * un sonido a las secuencias del simon
   * dice. Dependiendo del color arrojara
   * un sonido, imitando al juego original.
   * @param color el color del simon
   * @returns nada
   */
  playSound(color: string) {
    let soundFile = '';
  
    switch(color) {
      case 'red':
        soundFile = 'assets/simonSays-Sounds/simonSound1.mp3';
        break;
      case 'blue':
        soundFile = 'assets/simonSays-Sounds/simonSound2.mp3';
        break;
      case 'green':
        soundFile = 'assets/simonSays-Sounds/simonSound3.mp3';
        break;
      case 'yellow':
        soundFile = 'assets/simonSays-Sounds/simonSound4.mp3';
        break;
      default:
        console.log('No sound for this color');
        return;
    }
    const audio = new Audio(soundFile);
    audio.play();
  }
  
}
