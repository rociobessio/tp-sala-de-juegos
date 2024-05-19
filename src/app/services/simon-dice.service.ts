import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { START_CONTADOR,Colores } from '../models/simonDice';

@Injectable({
  providedIn: 'root'
})
export class SimonDiceService {
  simon: string[] = [];//-->El simon dice
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
    this.simon.push(this.getRandomColor);
    // this.jugador = [];
  }

  generateSimonSays():string[]{
    this.simon = [];//-->Para el restart
    for (let index = 0; index < this.contador; index++) {
      this.addNewSimon();
    }
    this.setStates();
    return this.simon;
  }

  restartSimon():string[]{
    this.contador = START_CONTADOR;
    return this.generateSimonSays();
  }

  playerGuess(color: string){
    this.jugador.push(color);
    if(!this.compareSimonWithPlayer()){
      this.jugador = [];
    }
    this.setStates();
  }

  compareSimonWithPlayer(): boolean{
    for (let index = 0; index < this.jugador.length; index++) {
      //-->No coincide ya una posicion, false
      if(this.jugador[index] !== this.simon[index]){
        return false;
      }
    }
    //-->Si coinciden las legths de los arrays
    if(this.jugador.length === this.simon.length){
      this.updateGame();
    }
    //-->Todo coincide:
    return true;
  }

  /**
   * Este update sirve para actualizar
   * una vez que estemos en una nueva instancia
   * del juego, es decir, generara otro color
   * para el simon y de las guesses del jugador
   * las limpiara para que puede reiniciar
   * la secuencia.
   */
  updateGame(){
    this.addNewSimon(true);//-->Agrego nuevo color y se incrementara el contador
    this.jugador = [];//-->Reinicio la secuencia del jugador
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
}
