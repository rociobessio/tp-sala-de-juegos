import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/auth.user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//-->El sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private router : Router, private userService: UserService) { }

  public user: Usuario = { email: '', clave: '' };

  ngOnInit(): void {
    console.log("Iniciando login...");   
  } 

  /**
   * Me permitira loguearme en la aplicacion
   * y realizar un ruteo de ser necesario.
   */
  login() : void {
    console.log('Usuario en login: ', this.user.email, this.user.clave);
    //-->Creo un usaurio
    let {email,clave} = this.user;

    //-->Voy al service para loguearme
    this.userService.login(email, clave)
      ?.then(response => {
        if(response != null){//-->Salio bien
          //-->Guardo el TOKEN en el localstorage
          localStorage.setItem('token', response.user!.uid);
          console.log(response);
          console.log('Correctamente logueado');

          //-->Que me lleve al home
          this.router.navigate(['/home']);
        }
        else{//-->Algo salio mal con las credenciales de sesion
          Swal.fire({
            icon: 'warning',
            title: 'Cuidado',
            text: 'E-mail o contraseña no validos.',
            footer: 'Reintente!'
          });
        }
      })
      .catch(error => {//-->Rompio otra cosa
        console.error('error en el inicio de sesión:', error); 
        Swal.fire({
          icon: 'warning',
          title: 'Cuidado',
          text: 'Ocurrio un error al intentar loguearse.',
          footer: 'Reintente!'
        })
      });
  }
  
  /**
   * Para realizar el login
   * rapido
   */
  fastLogin() : void{
    this.user.email = "sudo.user@gmail.com";
    this.user.clave = "123456";
  }
  
}
