import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth.user.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userEmail: string | null = null;
  mostrarWelcome = true;

  constructor(private userService : UserService,private router : Router) {}

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
        console.log('No user logged in');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Si no estas logueado no podes jugar!',
          footer: 'Logueate!',
          timer: 2500
        });
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Metodo para saber si mostrar
   * o no el welcome o la info del
   * usuario logueado.
   */
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
  }
  
}
