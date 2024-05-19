import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimonDiceService } from '../../../services/simon-dice.service';
import { sleep } from '../../../models/simonDice';
import { BotonComponent } from './boton/boton.component';

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
    this.simonService.endSimon();
  }

  /**
   * En el OnInit me suscribo al observable de mi
   * servicio del juego, el status. 
   * Me fijare si el contador del component y el 
   * del status son distintos. Si lo son ire mostrando
   * la secuencia de colores.
   * 
   * Sumare al contador y tambien llamare a mi servicio
   * para generar el simon dice. 
   */
  ngOnInit(): void {
    // console.log('Secuencia simon: ',this.simonService.generateSimonSays());
    this.simonService.status.subscribe( status =>{
      console.log('Status: ',status);

      if(this.contador != status.contador){//-->Solo cuando el contador cambie
        this.showColorToPlayer(status.simon);
      }

      this.contador = status.contador;//-->Sumo al contador
    });

    this.simonService.generateSimonSays();//-->Voy a generar el simonDice
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
    console.log('Player guess: ',e);
    this.simonService.playerGuess(e);
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
    for (let index = 0; index < simon.length; index++) {
      await sleep(300);
      this.colors[simon[index]] = true;
      this.simonService.playSound(simon[index]);//-->Dependiendo el color se reproduce un sonido
      await sleep(500);
      this.colors[simon[index]] = false;
      await sleep(200);
    }
  }  
}