import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  wrapper: HTMLElement | null;
  registerLink: HTMLElement | null;
  loginLink: HTMLElement | null;

  constructor() {
    this.wrapper = document.querySelector('.wrapper-login');
    this.registerLink = document.querySelector('.registrate-link');
    this.loginLink = document.querySelector('.login-link');

    // Asignación del evento onclick dentro del constructor
    if (this.registerLink) {
      this.registerLink.onclick = () => {
        if (this.wrapper) {
          this.wrapper.classList.add('active');
        }
      };
    }
  }

  ngOnInit(): void {
    console.log("Iniciando login...");   
  } 
}


