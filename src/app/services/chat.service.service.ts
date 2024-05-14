import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { message } from '../interfaces/message.interface';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private firestore: Firestore) { }
  public subChat !: any;

  /**
   * Me permite agregar un nuevo chat, 
   * lo guarda en firestore
   * devolviendo una promesa
   * @param nuevoMsj 
   */
  addChat(nuevoMsj: message) : Promise<any>{
    const col = collection(this.firestore,'chats');
    return addDoc(col,nuevoMsj);
  }

}
