import { Component, OnInit, Output, output } from '@angular/core';
import { HigherOrLower } from '../../../models/higherOrLower';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-omenor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-omenor.component.html',
  styleUrl: './mayor-omenor.component.css'
})

export class MayorOMenorComponent implements OnInit{
  public cards = HigherOrLower.getCards();//-->Obtengo las cards

  public cardActual:string = '';//-->La carta actual que jugare
  public cardAnterior: string = '';//-->La card anterior jugada
  //-->Es la primer card al iniciar partida
  public cardComienzo: string = 'assets/higherOrLower/card-comienzo.png';

  public selec:boolean = false;//-->Si es higher es true si es false lower
  public points: number = 0;//-->Donde se acumularan los numeros para los rankings de usuarios

  constructor() {
    console.log('Array de las cards: ', this.cards);//-->Imprimo  para ver que llegan
  }  

  /**
   * En la interfaz ngOnInit 
   * obtendre la card actual 
   * a seleccionar
   */
  ngOnInit(): void {
    this.newCard();//-->Escojo nueva card
  }

  /**
   * Dependendiendo del boton que toque el
   * usuario se corroborara el numero o caracter
   * de la card actual con la anterior.
   * Si es mayor se suma un punto, si empata no
   * pasa nada y si es menor pierde.
   * @param option la opcion higher or lower,
   * si es true es higher y si es false es lower
   */
  higherOrLower(option: boolean){
    this.selec = option;//-->La opcion
    this.cardAnterior = this.cardActual;//-->La card anterior pasa a ser la actual
    let indexAnterior = this.cards.indexOf(this.cardAnterior);//-->El index de la card anterior

    this.newCard();//-->Nueva carta actual
    
    let indexNueva = this.cards.indexOf(this.cardActual);//-->Index de la card actual
    // console.log(this.selec);
    console.log('Index anterior: ', indexAnterior);
    console.log('Index nueva: ', indexNueva);
    //-->En la posicion 21 esta el caracter o numero a comparar
    console.log('Check number/caracter: ',this.cards[indexAnterior][21]);
    
    if (indexAnterior >= 0 && indexAnterior < this.cards.length && 
      //-->si higher(true) 6>3 suma puntos
      (this.selec && indexNueva > indexAnterior ||
      //-->si lower(false) 6<3 suma puntos
      !this.selec && indexNueva < indexAnterior) || 
      //-->Si empatan
      this.cards[indexAnterior][21] === this.cards[indexNueva][21])
    {
      console.log(this.points);
      this.points++;//-->Se incrementan los puntos
    }
    else{//-->Si no cumple pierde
      Swal.fire({
        title: 'Perdiste, sigue intentando!',
        icon: 'error',
        confirmButtonText: 'Reintentar',
        text: 'Haz conseguido un total de ' + this.points +' puntos.'
      })
      .then(() =>{
        this.points = 0;//-->Se reinician los points
        this.newCard();//-->Genero una nueva card
        this.cardAnterior = '';
      });
    }
  }

  /**
   * Selecciona una carta aleatoria
   * y la guarda en la cardActual
   */
  newCard(){this.cardActual = this.cards[Math.floor(Math.random() * this.cards.length)];}
}
