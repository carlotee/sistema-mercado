import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginaprincipalclientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginaprincipalclientes.html',
  styleUrl: './paginaprincipalclientes.css'
})
export class PaginaprincipalclientesComponent {
  constructor(private router: Router) {}

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }
  verCompras() {
    this.router.navigate(['/carrito']);
  }
}