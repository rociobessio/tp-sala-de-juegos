import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../services/chat.service.service';
import { UserService } from '../../services/auth.user.service';
import { message } from '../../interfaces/message.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  constructor(private chatService : ChatServiceService,private userService: UserService) {} 
  
  userLoggued: any;//-->Cualquier tipo es para la validacion de usuario
  public newMessage: message = { emisor: '', fecha: '', texto: '',};
  public mensajes: message[] = [{
    emisor:'sudo.user@gmail.com',
    fecha:'10:35 AM',
    texto:"Hola soy Juan"
  },
  {
    emisor:'pablito@gmail.com',
    fecha:'10:31 AM',
    texto:"Hola Juan, soy Pablito"
  },
];
  public sub!: any;

  /**
   * En el init traigo los chats
   * y veo que el usuario este logueado.
   */
  ngOnInit() {
    this.userService.getUserLogged().subscribe(user => {
      if (user) {
        console.log('Logged in user:', user);
        this.userLoggued = user;//-->Asigno
      } else {
        console.log('No user logged in');
      }
    });
  }
  
  /**
   * Permitira enviar los 
   * mensajes de los usuarios 
   * y guardarlos
   */
  async sendMessage(){
    console.log(this.newMessage);

    let message = {
      emisor: this.userLoggued.email,
      texto: this.newMessage.texto,
      fecha: new Date().toTimeString() + " - " + new Date().toDateString()
    };
    try {
      await this.chatService.addChat(message).then((chat) => {
        this.newMessage.texto = '';
        setTimeout(() => {
          this.scrollToTheLastElementByClassName();
        }, 30);
      });
    } catch (error) {
      console.log(error);
    }
    // this.newMessage.texto = "";
  }

  /**
   * Para hacer autoscroll
   * de los msj mediante
   * el ultimo msj
   */
  scrollToTheLastElementByClassName() {

    let element = document.getElementsByClassName('msg');
    if (element.length > 0) {

      let lastElement: any = element[element.length - 1];
      let toppos = lastElement.offsetTop;

      const contMsg = document.getElementById('content-message');
      console.log(contMsg!.scrollTop);

      contMsg!.scrollTop = toppos;
    }
  }
}

