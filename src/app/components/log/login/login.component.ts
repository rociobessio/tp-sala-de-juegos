import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  active: boolean = false;

  ngOnInit(): void {
    console.log("Iniciando login...");   
  } 
}
