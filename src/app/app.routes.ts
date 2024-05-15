import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/log/login/login.component';
import { RegisterComponent } from './components/log/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { HangmanComponent } from './components/games/hangman/hangman.component';
import { MayorOMenorComponent } from './components/games/mayor-omenor/mayor-omenor.component';

export const routes: Routes = [
    {path:'', redirectTo:'/login',  pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home', component:HomeComponent},
    {path:'hang-man', component:HangmanComponent},
    {path:'higherOrLower', component:MayorOMenorComponent},
    {path:'chat', component:ChatComponent},
    {path:'about-me', component:AboutMeComponent},
    {path:'**', component:PageNotFoundComponent}
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
  