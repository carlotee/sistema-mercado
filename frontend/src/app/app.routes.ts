import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { PaginaprincipalclientesComponent } from './pages/paginaprincipalclientes/paginaprincipalclientes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'principal-clientes', component: PaginaprincipalclientesComponent }, // Nueva ruta
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];