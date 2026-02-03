import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importamos el servicio

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  // Objeto que agrupa los campos para que sea más fácil enviarlos
  userData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    rol: 'cliente' // Por defecto para nuevos registros
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onRegistro() {
    // Validamos que los campos obligatorios no estén vacíos
    if (!this.userData.nombre || !this.userData.email || !this.userData.password) {
      this.errorMessage = 'Por favor, completa los campos obligatorios.';
      return;
    }

    console.log('Enviando datos de registro:', this.userData);

    // Llamamos al método del servicio
    this.authService.registro(this.userData).subscribe({
      next: (res: any) => {
        alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']); // Redirige al login tras el éxito
      },
      error: (err: any) => {
        console.error('Error en el registro:', err);
        this.errorMessage = err.error?.mensaje || 'Error al intentar registrar el usuario.';
      }
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}