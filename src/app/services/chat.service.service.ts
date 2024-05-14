import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { message } from '../interfaces/message.interface';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
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

  /**
   * Me permitira ordenar los mensajes por
   * la fecha para asi ver su
   * ordenamiento
   * @param a mensaje 1
   * @param b mensaje 2
   * @returns un int sobre el ordenamiento
   */
  sortMessages(a: message, b: message): number {
    const fechaA = new Date(a.fecha.split(' - ')[1] + ' ' + a.fecha.split(' - ')[0]);
    const fechaB = new Date(b.fecha.split(' - ')[1] + ' ' + b.fecha.split(' - ')[0]);
    let cmp = 0;
    if (fechaA < fechaB) { cmp = -1; }
    else if (fechaA > fechaB) { cmp = 1; }
    return cmp;
  }

  /**
   * Me permitira obtener los mensajes
   * almacenados dentro de firestore
   * con toda su informacion
   * para luego acomodarlos y mostrarlos 
   * en el chat
   * @param messages array de mensajes
   */
  getMessages(messages: message[]) {
    const q = query(collection(this.firestore, "chats"));
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          messages.push({
            emisor: change.doc.data()['emisor'],
            fecha: change.doc.data()['fecha'],//-->Deberia de ser solo la hora
            texto: change.doc.data()['texto']
          });
          messages.sort(this.sortMessages);
        }
      });
    });
  }

  
  
}
