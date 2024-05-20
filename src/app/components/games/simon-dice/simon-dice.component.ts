import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimonDiceService } from '../../../services/simon-dice.service';
import { sleep } from '../../../models/simonDice';
import { BotonComponent } from './boton/boton.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simon-dice',
  standalone: true,
  imports: [BotonComponent],
  templateUrl: './simon-dice.component.html',
  styleUrl: './simon-dice.component.css'
})
export class SimonDiceComponent implements OnInit,OnDestroy {
  contador!: number;
  intervaloTiempo!: any;//-->Para manejar los tiempos
  colors:any = {//-->Color para manejar los botones y sus estados (prendido/apagado)
    red: false,
    blue: false,
    green: false,
    yellow: false
  };

  gameStarted: boolean = false;//-->Para manejar si ha comenzado la partida
  private statusSubscription!: Subscription;//-->Para controlar la suscripcion
  
  /**
   * En el constructor llamare al servicio
   * del juego.
   */
  constructor(private simonService:SimonDiceService) {}

  /**
   * En el OnDestroy finalizo la
   * partida del simon dice.
   */
  ngOnDestroy(): void {
    this.gameStarted = false;//-->Pasa a false
    this.simonService.endSimon();//-->Termino el juego
    if (this.statusSubscription) {//-->Si esta suscripto lo desuscribo
      this.statusSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  /**
   * En el startGame() me suscribo al observable de mi
   * servicio del juego, el status. 
   * Me fijare si el contador del component y el 
   * del status son distintos. Si lo son ire mostrando
   * la secuencia de colores.
   * 
   * Sumare al contador y tambien llamare a mi servicio
   * para generar el simon dice. 
   */
  public startGame(){
    //-->Me fijo que este suscripto
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    //-->Juego iniciado cambio la flag
    this.gameStarted = true;

    //-->Suscribo para controlar el mostrar los colores
    this.statusSubscription = this.simonService.status.subscribe(status => {
      console.log('Status: ', status);
      
      if (this.contador !== status.contador) {//--> Solo cuando el contador cambie
        console.log('Partida empezada: ', this.gameStarted);
        this.showColorToPlayer(status.simon);//--> Mostrare los colores
      }
      this.contador = status.contador;//--> Sumo al contador
    });
    this.simonService.generateSimonSays(); //--> Genero Simon dice
  }

  /**
   * Tomare el color seleccionado
   * del usuario por el boton que haya
   * apretado y de alli ire a chequearlo
   * al metodo del servicio. 
   * Recorriendo el array en busca de coincidencia.
   * @param e el 'event emitter'
   * el color
   */
  playerGuess(e: string){
    if (this.gameStarted) {//-->Si el juego esta activo
      console.log('Player guess: ', e);
      //-->Traigo si la guess fue correcta
      const isCorrect = this.simonService.playerGuess(e);

      if (!isCorrect) {//-->Si es incorrecta
        this.gameStarted = false;//--> Detengo el juego si es incorrecta
        this.simonService.endSimon(); //--> Termino la partida del Simon dice
        this.contador = 0;//-->Setteo el contador a 0
        //-->Si estaba suscripto lo desuscribo
        if (this.statusSubscription) {
          this.statusSubscription.unsubscribe();
          console.log('perdio la partida, reinicio');
        }
      }
    }
  }

  /**
   * Esta funcion asincronica me permitira
   * recorrer el array del simon dice para
   * mostrar los colores de la secuencia,
   * permitiendome settear un tiempo para mostrar
   * el cambio de secuencia llamando a un metodo
   * del model de simonDice.
   * @param simon el array del simon dice
   * que contiene la secuencia de colores 
   * guardada.
   */
  async showColorToPlayer(simon: string[]){
    // if(this.gameStarted){
      for (let index = 0; index < simon.length; index++) {
        await sleep(300);
        this.colors[simon[index]] = true;
        this.simonService.playSound(simon[index]);//-->Dependiendo el color se reproduce un sonido
        await sleep(500);
        this.colors[simon[index]] = false;
        await sleep(200);
      }
    // }
  }  
}