import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { PaginaprincipalclientesComponent } from './pages/paginaprincipalclientes/paginaprincipalclientes';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'principal-clientes', component: PaginaprincipalclientesComponent }, // Nueva ruta
  { path: 'editar-perfil', component: EditarPerfilComponent }, // Nueva ruta para editar perfil
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];