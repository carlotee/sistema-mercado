import { Component, OnInit } from '@angular/core'; // 1. Importamos OnInit
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
export class DashboardComponent implements OnInit { // 2. Implementamos la interfaz
  
  // Estructura sincronizada exactamente con tu tabla 'productos'
  nuevoProducto = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    id_categoria: 1, // Por defecto primera categoría
    estado: 'activo'
  };

  selectedFile: File | null = null;
  imagenPreview: string | null = null;
  listaProductos: any[] = []; // Array para almacenar lo que viene de la BD

  constructor(private authService: AuthService, private router: Router) {}

  // 3. Al iniciar, traemos los productos de la BD
  ngOnInit() {
    this.obtenerInventario();
  }

  obtenerInventario() {
    this.authService.getProductos().subscribe({
      next: (res: any) => {
        this.listaProductos = res; // Llena la tabla de "Inventario Actual"
      },
      error: (err) => console.error('Error al cargar inventario:', err)
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // 4. Modificado para enviar datos reales a market_db
  guardarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    // Usamos FormData para enviar el archivo físico al backend
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('stock', this.nuevoProducto.stock.toString());
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('id_categoria', this.nuevoProducto.id_categoria.toString());
    formData.append('estado', this.nuevoProducto.estado);
    
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    this.authService.crearProducto(formData).subscribe({
      next: (res) => {
        alert('✅ ¡Producto publicado con éxito!');
        this.limpiarFormulario();
        this.obtenerInventario(); // 5. Recarga la tabla automáticamente para ver el nuevo producto
      },
      error: (err) => alert('Error al conectar con el servidor.')
    });
  }

  limpiarFormulario() {
    this.nuevoProducto = { 
      nombre: '', 
      precio: 0, 
      stock: 0, 
      descripcion: '', 
      id_categoria: 1, 
      estado: 'activo' 
    };
    this.imagenPreview = null;
    this.selectedFile = null;
  }

  logout() {
    localStorage.removeItem('usuario_mercado');
    this.router.navigate(['/login']);
  }
}