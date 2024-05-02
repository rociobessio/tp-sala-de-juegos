import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth.user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  usuario?: string | null | undefined | void= this.getUserLogged();
  // fIngreso: string = '';
  mostrarWelcome = true;

  constructor(private userService : UserService) {}

  toggleWelcomeAndUserInfo() {
    this.mostrarWelcome = !this.mostrarWelcome;
  }

  /**
   * Me permitira mostrar
   * el email del usuario
   * registrado suscribiendome al evento
   * y ademas el getUserLogged del servicio
   * retorna un observable.
   */
  getUserLogged(): string | null {
    const user = this.userService.getUserLogged();
    return user ? user.email : null;
  }
  
}
