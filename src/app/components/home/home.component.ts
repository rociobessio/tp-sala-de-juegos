import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  usuario: string = '';
  fIngreso: string = '';
  mostrarWelcome = true; // Variable para controlar la visibilidad de welcome/info-usuario

  constructor() {}

  toggleWelcomeAndUserInfo() {
    this.mostrarWelcome = !this.mostrarWelcome;
  }
}
