import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  colors:any = {//-->Color para manejar los botones y sus estados (prendido/apagado)
    red: false,
    blue: false,
    green: false,
    yellow: false
  };
  
  /**
   *
   */
  constructor(private simonService:SimonDiceService) {}

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    console.log('Secuencia simon: ',this.simonService.generateSimonSays());
    this.simonService.status.subscribe( status =>{
      console.log('Status: ',status);

      if(this.contador != status.contador){//-->Solo cuando el contador cambie
        this.contador = status.contador;
        this.teasePlayer(status.simon);
      }
    });
    this.simonService.generateSimonSays();
  }

  playerGuess(e: string){
    console.log('Player guess: ',e);
    this.simonService.playerGuess(e);
  }

  async teasePlayer(simon: string[]){
    for (let index = 0; index < simon.length; index++) {
      this.colors[simon[index]] = true;
      await sleep(500);
      this.colors[simon[index]] = false;
      await sleep(200);
    }
  }


  
}