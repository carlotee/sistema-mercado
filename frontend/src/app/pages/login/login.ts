import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Variables de formulario vinculadas con [(ngModel)]
  email: string = '';
  password: string = '';
  
  // Manejo de UI y errores
  errorMessage: string = '';
  passwordVisible: boolean = false; // Controla el ver/ocultar contraseña

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  /**
   * Cambia el estado de visibilidad de la contraseña
   */
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Envía los datos al backend para validar contra la base de datos mercado_db
   */
onSubmit(): void {
  const credentials = {
    email: this.email,
    password: this.password
  };

  this.authService.login(credentials).subscribe({
    next: (res: any) => {
      console.log('Login exitoso:', res);
      this.errorMessage = '';
      this.router.navigate(['/principal-clientes']); 
    },
    error: (err: any) => {
      console.error('Error en el login:', err);
      // Si el backend envía un mensaje específico, lo mostramos
      // Si no, usamos un mensaje genérico
      this.errorMessage = err.error?.mensaje || 'Error al conectar con el servidor o credenciales inválidas.';
    }
  });
}
  /**
   * Navegación manual hacia la página de registro
   */
  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}