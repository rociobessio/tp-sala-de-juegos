import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //-->Para el menu icon cuando sea pantalla d mobile lo muestro o no
  menuValue: boolean = false;
  strIconoMenu: string = 'fa-solid fa-bars';
  menuIcon: string = this.strIconoMenu;//-->Para mostrar el icono o una cruz

  /**
   * Si es true que lo haga false,
   * si es false entonces true.
   * 
   * Si es true (abre el menu) y muestra una cruz,
   * si es false (menu cerrado) entonces se muestra el icono para abrirlo
   */
  abrirMenu(){
    this.menuValue =! this.menuValue;
    this.menuIcon = this.menuValue ? 'fa-solid fa-x' : this.strIconoMenu;
  }

  /**
   * Al clickear una de las opciones
   * me tendra que rutear y luego cerrar
   * el menu
   */
  cerrarMenu(){
    this.menuValue = false;
    this.menuIcon = this.strIconoMenu;
  }
}
