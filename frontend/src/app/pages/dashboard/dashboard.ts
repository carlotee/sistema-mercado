import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ⬅️ IMPORTANTE: Esto quita el error de ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // ⬅️ Agrégalo aquí también
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  // 🆕 Define el objeto que el HTML no encontraba (Error TS2339)
  nuevoProducto = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  guardarProducto() {
    console.log('Enviando producto a la base de datos market_db:', this.nuevoProducto);
    // Aquí llamarás a la ruta del backend que configuramos para agregar productos
    alert('Producto listo para ser guardado');
  }

  logout() {
    localStorage.removeItem('usuario_mercado');
    this.router.navigate(['/login']);
  }
}