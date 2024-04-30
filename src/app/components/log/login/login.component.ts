import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private router : Router, private userService : UserService) { }
  public user: Usuario = { email: '', clave: '' };

  ngOnInit(): void {
    console.log("Iniciando login...");   
  } 


  login() : void {
    console.log(this.user.email, this.user.clave);
    
    this.userService.login(this.user.email, this.user.clave)
      ?.then(response => {
        console.log(response);
        console.log('Correctamente logueado');
        //-->Que me lleve al home
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Error en el inicio de sesión:', error); 
      });
  }
  
  
}
