import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/auth.user.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent { 
  /**
  * llamo al inyectable del servicio
  */
  constructor(private router : Router, private userService: UserService) { }
  //--> Inicializando interfaz del usuerio
  public user: Usuario = { email: '', clave: '' };

  /**
  * Este metodo me permitira registrar
  * un user en firestore 
  */
  register() : void{
    //-->Que no este vacio
    // console.log('estoy en register');
    // if (this.user.clave != '' && this.user.email != ''){  
    //   this.userService.register(this.user.email,this.user.clave)?.
    //   then( response =>{
    //     console.log(response);
    //     console.log('Correctamente registrado');
    //     //-->Que me lleve al home
    //     this.router.navigate(['/home']);
    //   })
    //   .catch(//-->Muestro alert de error

    //   );
    // }
    // else{
    //   console.log('vacios');
    // }
    
  }

}
