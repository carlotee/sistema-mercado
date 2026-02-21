import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { PaginaprincipalclientesComponent } from './pages/paginaprincipalclientes/paginaprincipalclientes';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil';
import { CarritoComponent } from './pages/carrito/carrito';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'principal-clientes', component: PaginaprincipalclientesComponent }, 
  { path: 'editar-perfil', component: EditarPerfilComponent }, 
  { path: 'carrito', component: CarritoComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];