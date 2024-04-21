import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'', redirectTo:'/login',  pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'about-me', component:AboutMeComponent},
    {path:'**', component:PageNotFoundComponent}
];
 