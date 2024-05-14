import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth.user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  // usuario: string|null = this.getUserLogged();
  userEmail: string | null = null;
  mostrarWelcome = true;

  constructor(private userService : UserService) {}

  /**
   * En el onInit 
   * guardo el email y lo imprimo
   * asi tambien corroboro
   * que haya logueado para mostrar el
   * componente.
   */
  ngOnInit() {
    this.userService.getUserLogged().subscribe(user => {
      if (user) {
        console.log('Logged in user email:', user.email);
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

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
  getUserLogged() :string|null {
    this.userService.getUserLogged().subscribe(user => {
      if (user) {
        console.log('Logged in user email:', user.email);
        return user.email;
      } else {
        return null;
      }
    });
    return null;

    // const user = this.userService.getUserLogged();
    // return user ? user.email : null;
  }
  
}
