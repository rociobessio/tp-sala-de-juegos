import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

 

export class AppComponent {
  title = 'tp-sala-juegos';

  constructor(private router: Router) {

  }
}
