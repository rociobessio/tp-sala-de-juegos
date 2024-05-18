import { Routes,RouterModule,Route } from '@angular/router';
import { NgModule } from '@angular/core';

//-->Los componentes de la pagina
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/log/login/login.component';
import { RegisterComponent } from './components/log/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { HangmanComponent } from './components/games/hangman/hangman.component';
import { MayorOMenorComponent } from './components/games/mayor-omenor/mayor-omenor.component';
import { TriviaComponent } from './components/games/trivia/trivia.component';

export const routes: Routes = [
    {path:'', redirectTo:'/login',  pathMatch:'full'},
    {
        path:'login', 
        loadComponent: () => 
            import('./components/log/login/login.component')
        .then((l) => l.LoginComponent)
    },
    {
        path:'register',
        loadComponent: () =>
            import('./components/log/register/register.component')
        .then((r) => r.RegisterComponent)    
    },
    {
        path:'home', 
        loadComponent:() =>
            import('./components/home/home.component')
        .then((h) => h.HomeComponent)
    },
    {
        path:'hang-man',
        loadComponent: () =>
            import('./components/games/hangman/hangman.component')
        .then((hang) => hang.HangmanComponent)
    },
    {
        path:'higherOrLower', 
        loadComponent: () =>
            import('./components/games/mayor-omenor/mayor-omenor.component')
        .then((hig) => hig.MayorOMenorComponent)
    },
    {
        path:'trivia', 
        loadComponent: () =>
            import('./components/games/trivia/trivia.component')
        .then((t) => t.TriviaComponent)
    },
    {
        path: 'SimonDice',
        loadComponent: () =>
            import('./components/games/simon-dice/simon-dice.component')
        .then((sd) => sd.SimonDiceComponent)
    },
    {
        path:'chat', 
        loadComponent: () =>
            import('./components/chat/chat.component')
        .then((c) => c.ChatComponent)
    },
    {
        path:'about-me', 
        loadComponent: () =>
            import('./components/about-me/about-me.component')
        .then((a) => a.AboutMeComponent)
    },
    {
        path:'**', 
        loadComponent: () =>
        import('./components/page-not-found/page-not-found.component')
        .then((e) => e.PageNotFoundComponent)
    }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
  