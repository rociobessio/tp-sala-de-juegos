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
   * Me permitira ordenar los mensajes,
   * primero se fijara la fecha, si son
   * iguales comparara los horarios.
   * @param a mensaje 1
   * @param b mensaje 2
   * @returns un int sobre el ordenamiento
   */
  sortMessages(a: message, b: message): number {
    const fechaA = new Date(`${a.fecha}`);
    const fechaB = new Date(`${b.fecha}`);
  
    //-->comparo las fechas
    if (fechaA < fechaB) {
      return -1;
    } else if (fechaA > fechaB) {
      return 1;
    }
  
    //--->Si las fechas coinciden, ordeno por horario
    const horarioA = new Date(`${a.fecha} ${a.horario}`);
    const horarioB = new Date(`${b.fecha} ${b.horario}`);
  
    if (horarioA < horarioB) {
      return -1;
    } else if (horarioA > horarioB) {
      return 1;
    }
  
    //-->Si todo coincide (horario/fecha) es indistinto
    return 0;
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
            fecha: change.doc.data()['fecha'],
            horario: change.doc.data()['horario'],//-->Deberia de ser solo la hora
            texto: change.doc.data()['texto']
          });
          messages.sort(this.sortMessages);
        }
      });
    });
  }

  /**
   * Me permitira formatear el 
   * horario del envio de
   * mensajes para que solo aparezca la hora.
   * @param horario 
   * @returns 
   */
  setDate(horario: Date = new Date(Date.now())){
    var horas = horario.getHours();
    var minutos = horario.getMinutes();
    var minutosStr = '';
    var horarioFinal = `${horas}:${minutos}`;
    if(minutos < 10)
    {
      minutosStr = '0' + minutos.toString();
      horarioFinal = `${horas}:${minutosStr}`;
    }
    return horarioFinal;
  }
  
}
