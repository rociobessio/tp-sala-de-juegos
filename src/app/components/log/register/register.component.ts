import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/auth.user.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  //-->Para confirmar la pass
  confirmPass!: string ;

  /**
  * Este metodo me permitira registrar
  * un user en firestore, fijandome que coincidan 
  * las passwords, que no hayan inputs vacios. 
  * Si todo sale bien loguea para crear el log y 
  * me lleva al home. Sino  salta una alerta con los errores.
  */
  register(): void { 
    if (this.user.clave == this.confirmPass && (this.user.clave != '' && this.user.email != '')) {
        this.userService.register(this.user.email, this.user.clave)
            ?.then(response => {
                console.log('Correctamente registrado');
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha registrado correctamente.',
                    footer: 'Felicidades!'
                }).then(() => {
                    //-->Logueo y redirecciono al home
                    this.userService.login(this.user.email, this.user.clave)
                        .then(res => {
                            if (res != null)
                                this.router.navigateByUrl('home');
                        });
                });
            })
            .catch(error => {
                console.error('Error en el registro:', error);
                //--> Mostrando mensaje de error por coincidencia de un registro existente
                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El correo electrónico ya está en uso.',
                        footer: 'Reintente con otro correo electrónico.'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al registrar el usuario.',
                        footer: 'Reintente!'
                    });
                }
            });
    } else {
        //-->No coinciden las paswword
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden o los campos están vacíos.',
            footer: 'Reintente!'
        });
    }
  }


}
