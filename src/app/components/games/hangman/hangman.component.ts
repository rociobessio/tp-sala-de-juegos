import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent {
  public intentos: number = 0;//-->Llevar cuenta de los intentos (la imagen se ira cambiando)


}
