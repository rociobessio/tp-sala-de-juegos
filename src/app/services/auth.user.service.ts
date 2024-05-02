import { Injectable } from "@angular/core";
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, Timestamp, addDoc, collection } from "@angular/fire/firestore";
import { signOut } from "firebase/auth";


@Injectable({
    providedIn:'root'
})

/**
 * Para tener un mejor control
 * del mamejo de usuarios
 */
export class UserService{
  //
  constructor(private authAngFire: Auth,private firestore: Firestore){ }

  /**
     * Metodo asincronico para registrar
     * un usuario con fb y autenticacion.
     * @param email 
     * @param pass 
     * @returns 
     */
  register(email:string , pass: string) {
      try{
          return createUserWithEmailAndPassword(this.authAngFire,email,pass);
      }
      catch(error){
          console.log('Error en el registro', error);
          return null;
      }
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
        console.error("Error al iniciar sesión:", error);
        return null;
    }
  }

  /**
   * Me permitira obtener info del usuario
   * loggueado para utilizarla.
   * Devuelve un observable
   */
  getUserLogged(){
    return this.authAngFire.currentUser;
  }

  logOut(){
    console.log('Deslogueandose');
    return signOut(this.authAngFire);
  }
      
}