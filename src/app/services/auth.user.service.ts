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

    
  async login(email: string, password: string) {
    try {
      console.log('en el login');
      return await signInWithEmailAndPassword(this.auth,email, password);
    } catch (error) {
      console.log("error al loguearse", error);
      return null;
    }
  }
      
}