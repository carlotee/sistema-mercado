import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent implements OnInit {
  carritoItems: any[] = [];
  id_usuario: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
    this.obtenerUsuario();
  }

  cargarCarrito() {
    const savedCart = localStorage.getItem('carrito_market');
    if (savedCart) {
      this.carritoItems = JSON.parse(savedCart);
    }
  }

  obtenerUsuario() {
    const session = localStorage.getItem('usuario_mercado');
    if (session) {
      const user = JSON.parse(session);
      this.id_usuario = user.id_usuario; 
    }
  }

  eliminarDelCarrito(item: any) {
    this.carritoItems = this.carritoItems.filter(i => i.producto.id_producto !== item.producto.id_producto);
    this.actualizarStorage();
  }

  calcularTotal(): number {
    return this.carritoItems.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  actualizarStorage() {
    localStorage.setItem('carrito_market', JSON.stringify(this.carritoItems));
  }

  finalizarCompra() {
    if (this.carritoItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    if (!this.id_usuario) {
      alert('❌ Error: No se encontró sesión de usuario. Por favor, re-inicia sesión.');
      this.router.navigate(['/login']);
      return;
    }

    const pedido = {
      id_usuario: this.id_usuario,
      total: this.calcularTotal(),
      metodo_pago: 'Efectivo', 
      items: this.carritoItems   
    };

    console.log('Enviando pedido a market_db:', pedido);

    this.authService.finalizarCompra(pedido).subscribe({
      next: (res) => {

        alert(`✅ ${res.mensaje}`); 
        
        this.carritoItems = [];
        this.actualizarStorage();
        
        this.router.navigate(['/principal-clientes']);
      },
      error: (err) => {
        console.error('Error al procesar compra:', err);
        alert('❌ Hubo un problema al registrar tu pedido. Revisa que el servidor esté activo.');
      }
    });
  }
}