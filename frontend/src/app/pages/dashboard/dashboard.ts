import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  // Estructura del producto ajustada a market_db
  nuevoProducto = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: '' // Aquí guardaremos el nombre o base64 de la imagen
  };

  // Variables para la gestión de archivos
  selectedFile: File | null = null;
  imagenPreview: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // 🆕 Esta es la función que te faltaba y causaba el error
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Creamos una previsualización para el Dashboard
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
        // Opcional: guardar el string en el objeto (depende de cómo reciba el backend)
        this.nuevoProducto.imagen = file.name; 
      };
      reader.readAsDataURL(file);
    }
  }

  guardarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    console.log('Subiendo nuevo producto a market_db:', this.nuevoProducto);
    
    // Aquí se enviaría al backend mediante el servicio
    // Recuerda que si usas imágenes reales, a veces se usa FormData en lugar de un objeto simple
    alert('✅ Producto "' + this.nuevoProducto.nombre + '" publicado con éxito.');
    
    // Limpiar formulario después de guardar
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nuevoProducto = { nombre: '', precio: 0, stock: 0, descripcion: '', imagen: '' };
    this.imagenPreview = null;
    this.selectedFile = null;
  }

  logout() {
    localStorage.removeItem('usuario_mercado');
    this.router.navigate(['/login']);
  }
}