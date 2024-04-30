import { Injectable } from "@angular/core";
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
    providedIn:'root'
})

/**
 * Para tener un mejor control
 * del mamejo de usuarios
 */
export class UserService{
    constructor( private auth : Auth){ }

    /**
     * Metodo asincronico para registrar
     * un usuario con fb y autenticacion.
     * @param email 
     * @param pass 
     * @returns 
     */
    register(email:string , pass: string) {
        try{
            return createUserWithEmailAndPassword(this.auth,email,pass);
        }
        catch(error){
            console.log('Error en el registro', error);
            return null;
        }
    }

    login(email:string , pass: string){
        try {
          // Verificar si el correo electrónico está vacío
          if (!email) {
            throw new Error('El correo electrónico no puede estar vacío.');
          }
          // Verificar si el correo electrónico tiene un formato válido
          if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('El correo electrónico proporcionado no tiene un formato válido.');
          }
          // Intentar iniciar sesión
          return signInWithEmailAndPassword(this.auth, email, pass);
        } catch(error) {
          console.error('Error en el inicio de sesión:', error);
          return null;
        }
      }
      
}