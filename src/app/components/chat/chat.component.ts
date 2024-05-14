import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../services/chat.service.service';
import { UserService } from '../../services/auth.user.service';
import { message } from '../../interfaces/message.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  constructor(private chatService : ChatServiceService,private userService: UserService,
    private router: Router
  ) {} 
  
  userLoggued: any;//-->Cualquier tipo es para la validacion de usuario
  public newMessage: message = { emisor: '', fecha: '', texto: '',};
  public mensajes: message[] = [];
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

        //-->Para obtener los mensajes
        this.chatService.getMessages(this.mensajes);

        console.log('Mensajes',this.mensajes);
        
      } else {//-->Quiere decir que no esta logueado
        console.log('No user logged in');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Si no estas logueado no podes entrar al chat!',
          footer: 'Logueate!',
          timer: 2500
        });
        //-->Esto despued lo vemos bien
        this.router.navigate(['/login']);
      }
    });
  }
  
  /**
   * Permitira enviar los 
   * mensajes de los usuarios 
   * y guardarlos en firebase
   */
  async sendMessage(){
    // console.log(this.newMessage);

    let message = {//-->Lo creo
      emisor: this.userLoggued.email,
      texto: this.newMessage.texto,
      fecha: new Date().toTimeString()
    };
    console.log(message);
    
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
      if (contMsg !== null) {
        contMsg.scrollTop = toppos;
      }
    }
  }
  
}

