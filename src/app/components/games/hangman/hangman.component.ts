import { Component, OnInit } from '@angular/core';
import { Hangman } from '../../../models/hangman';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent implements OnInit{
  public intentos: number = 0;//-->Llevar cuenta de los intentos (la imagen se ira cambiando)
  public winnerOrNo:boolean | undefined = undefined;//-->Para saber si gana la partida

  public wordsHangman: string[] = Hangman.getWords();//-->Obtengo las palabras disponibles
  public lettersKeyboard: string[] = Hangman.getLettersKeyboard();//-->Obtengo las letras
  public letterClicked: {[letter:string]:boolean} = {};

  public hiddenWord:string = "";
  public wordToGuess:string = this.wordsHangman[Math.floor(Math.random() * this.wordsHangman.length)];//-->Obtengo una random

  /**
   * En el OnInit defino la palabra
   * que se debera de adivinar, 
   * lo separo por guiones para saber 
   * la cantidad de letras que que
   * tiene la palabra oculta.
   */
  ngOnInit(): void {
    this.hiddenWord = this.wordToGuess.split('')
    .map(letter => letter = '_ ')
    .join('');//-->Cambio la palabra por guiones
    console.log('palabra oculta: ',this.wordToGuess);
  }

  /**
   * Me permitira ver si las
   * letras que presiona el usuario
   * se encuentran dentro de la palabra.  
   * @param letter letra presionada
   */
  checkLetter(letter:string){
    if(!this.letterClicked[letter]){//-->Si no se ha clickeado la letra correcta
      this.searchLetter(letter);//--->Sumo a los intentos realizados
      
      const letterHidden = this.hiddenWord.split(" ");
      for(let i = 0; i<= this.wordToGuess.length;i++){
        if(this.wordToGuess[i] == letter)
          letterHidden[i] = letter;
      }
      
      this.hiddenWord = letterHidden.join(" ");
      this.letterClicked[letter] = true;

      //-->Verifico si gano o no
      this.winnerOrLoser();
    }
  }

  /**
   * En caso de que el 
   * usuario quiera 
   * reiniciar la partida directamente
   * vuelvo a cargar la pag.
   */
  restartGame(){
    window.location.reload();
  }

  /**
   * Este metodo lo que hara es que
   * a medida que se va clickeando las
   * letras se fijara si ha realizado
   * completamente la palabra y gano,
   * o si ha utilizado todos los intentos
   * y perdio.
   */
  winnerOrLoser(){
    const wordInArray = this.hiddenWord.split(" ");
    const checkWord = wordInArray.join("");//-->Los uno para formar la palabra
    //-->Si la palabra oculta coincide con la que fue realizando
    if(checkWord == this.wordToGuess){
      this.winnerOrNo = true;//-->Partida cambia a true
      Swal.fire({
        title: 'Felicidades, ganaste!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    else if(this.intentos == 6){//-->Sucedio que perdio los 6 intentos
      this.winnerOrNo = false;
      Swal.fire({
        title: 'Perdiste, a seguir intentando!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  /**
   * Si la letra clickeada NO
   * esta dentro de la palabra
   * oculta se le suma un intento
   * al usuario.
   * @param letter letra clickeada
   */
  searchLetter(letter:string){
    if(!this.wordToGuess.includes(letter)){//-->Si la letra NO esta en la palabra
      this.intentos++;
    }
  }
}
