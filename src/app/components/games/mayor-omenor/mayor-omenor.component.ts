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
  public cards = HigherOrLower.getCards();

  @Output()
  public cardActual:string = '';
  public cardAnterior: string = '';
  //-->Es la primer card al iniciar partida
  public cardComienzo: string = 'assets/higherOrLower/card-comienzo.png';

  public selec:boolean = false;
  public points: number = 0;//-->Donde se acumularan los numeros para los rankings de usuarios

  constructor() {
    console.log('Array de las cards: ', this.cards);
  }  

  /**
   * En la interfaz ngOnInit 
   * obtendre la card actual 
   * a seleccionar
   */
  ngOnInit(): void {
    this.newCard();
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
    this.cardAnterior = this.cardActual;
    let indexAnterior = this.cards.indexOf(this.cardAnterior);

    this.newCard();
    
    let indexNueva = this.cards.indexOf(this.cardActual);
    // console.log(this.selec);
    console.log('Index anterior: ', indexAnterior);
    console.log('Index nueva: ', indexNueva);
    console.log('Check number/caracter: ',this.cards[indexAnterior][21]);
    
    if (indexAnterior >= 0 && indexAnterior < this.cards.length && 
      (this.selec && indexNueva > indexAnterior ||
      !this.selec && indexNueva < indexAnterior) || 
      this.cards[indexAnterior][21] === this.cards[indexNueva][21])
    {
      console.log(this.points);
      this.points++;//-->Se incrementan los puntos
    }
    else{
      Swal.fire({
        title: 'Perdiste, sigue intentando!',
        icon: 'error',
        confirmButtonText: 'Reintentar',
        text: 'Haz conseguido un total de ' + this.points +' puntos.'
      })
      .then(() =>{
        this.points = 0;//-->Se reinician los points
        this.newCard();
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
