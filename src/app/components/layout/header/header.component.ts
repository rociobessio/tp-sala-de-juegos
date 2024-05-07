import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/auth.user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  //--> Para que funcione la navegacion del navbar agregar estos imports:
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  /**
   *
   */
  constructor(private userService: UserService, private router: Router) {}

  logOut(){
    // console.log('en logout');
    this.userService.logOut();
    this.router.navigateByUrl('login');
  }
}
