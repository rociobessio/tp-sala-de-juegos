import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

/**
 * Donde se manejara
 * la informacion que voy
 * a motrar (personal/juego)
 */
export class AboutMeComponent {
  //--> Para mostrar o no el contenido de la division (por default 'sobre mi')
  div: 'sobre-mi' | 'sobre-juego' = 'sobre-mi';

  /**
   * Me permitira mostrar un div u otro dependiendo
   * del valor que llegue.
   * @param numeroDiv numero por el cual sabre
   * que div mostrar
   */
  mostrarDiv(stringDiv: 'sobre-mi' | 'sobre-juego') {
    this.div = stringDiv;
  }
}
