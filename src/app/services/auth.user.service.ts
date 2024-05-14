import { Injectable } from "@angular/core";
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from "@angular/fire/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, Timestamp, addDoc, collection } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User, fetchSignInMethodsForEmail, getAuth, signOut } from "firebase/auth";
import { Observable, from, map, of } from "rxjs";
import Swal from "sweetalert2";
import { Usuario } from "../interfaces/user.interface";


@Injectable({
    providedIn:'root'
})

/**
 * Para tener un mejor control
 * del mamejo de usuarios
 */
export class UserService{
  msjError: string = "";

  constructor(private authAngFire: Auth,private firestore: Firestore,private router: Router){ }

  /**
     * Metodo asincronico para registrar
     * un usuario con fb y autenticacion.
     * @param email 
     * @param pass 
     * @returns 
     */
  register(email: string, pass: string){
    createUserWithEmailAndPassword(this.authAngFire, email, pass)
    .then((response) =>{
      //-->Guardo el log
      addDoc(collection(this.firestore, 'logs'), {
        email: email,
        loginTime: Timestamp.now()
      });

      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se ha registrado correctamente.',
        footer: 'Felicidades!',
        timer: 1500
      });

      //-->Todo ok, voy al home
      this.router.navigate(["/home"]);
    })
    .catch((error) =>{
      //-->Los errores posibles
      switch(error.code){
        case "auth/invalid-email":
          this.msjError = "Email no valido!"
        break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya registrado!"
        break;
        case "auth/weak-password":
          this.msjError = "La contraseña debe ser mayor a 6 caracteres!"
        break;
        default:
          this.msjError = "Error inesperado al intentar registrarse!"
        break;
      }

      //-->Lanzo el mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: this.msjError,
        footer: 'Reintente!'
      });
    });

}


   
    
  /**
   * Metodo que me permitira realizar un login 
   * dentro de la aplicacion ademas guarda el log
   * del usuario, su mail y su fecha de ingreso a la
   * aplicacion.
   * @param email 
   * @param password 
   * @returns 
   */
  async login(email: string, password: string) {
    try {
        const response = await signInWithEmailAndPassword(this.authAngFire, email, password);
        if (response) {
            //-->Obtengo cuando se logueo en la app
            const loginTime = Timestamp.now();
            //-->Guardo el log del  inicio de sesion a Firebase
            await addDoc(collection(this.firestore, 'logs'), {
                email: email,
                loginTime: loginTime
            });
            return response;
        } else {
            return null;
        }
    } catch (error) {
        // console.error("Error al iniciar sesión:", error);
        return null;
    }
  }

  /**
   * Me permitira obtener info del usuario
   * loggueado para utilizarla. 
   */
  // getUserLogged(){
  //   return this.authAngFire.currentUser;
  // }
  getUserLogged(): Observable<User | null> {
    return Observable.create((observer: { next: (arg0: User | null) => void; complete: () => void; }) => {
      observer.next(this.authAngFire.currentUser);
      observer.complete(); // Complete the observable
    });
  }
  
  
  

  logOut(){
    console.log('Deslogueandose');
    //-->Elimino el token
    // localStorage.removeItem('token');
    return signOut(this.authAngFire)
    .then(() => {
        console.log(this.authAngFire.currentUser?.email)
      })
    .catch(error =>{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error al intentar desloguearse.',
            footer: 'Reintente!'
        }); 
    });
  }
}