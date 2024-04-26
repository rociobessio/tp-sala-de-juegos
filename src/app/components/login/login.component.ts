import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login', 
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  active: boolean = false;

  /**
   * Con esto al presionar sobre el signup/login
   * cambiara de visualizacion para el usuario.
   * Utilizo preventDefault para que no recargue la pagina
   * @param event un evento
   */
  toggleActive(event?: Event) {
    console.log('mostramos el register');
    if (event) {
      event.preventDefault();
    }
    this.active = !this.active;
  }

  toggleDesactivate(event?: Event) {
    console.log('ocultamos el register, mostramos login');
    if (event) {
      event.preventDefault();
    }
    this.active = !this.active;
  }

  ngOnInit(): void {
    console.log("Iniciando login...");   
  } 
}


