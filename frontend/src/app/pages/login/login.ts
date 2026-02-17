import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordVisible: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log('Login exitoso:', res);
          
          // 1. Guardamos el objeto 'usuario' que viene del backend
          // Esto incluye id_usuario, nombre, rol, etc.
          const usuario = res.usuario;
          localStorage.setItem('usuario_mercado', JSON.stringify(usuario));

          // 2. Lógica de Redirección basada en el ROL de la base de datos
          if (usuario.rol === 'admin' || usuario.rol === 'empleado') {
            console.log('Bienvenido Administrador/Empleado');
            this.router.navigate(['/dashboard']); // Página para agregar productos
          } else {
            console.log('Bienvenido Cliente');
            this.router.navigate(['/principal-clientes']); // Página de compras
          }
          
          this.errorMessage = '';
        }
      },
      error: (err: any) => {
        console.error('Error en el login:', err);
        this.errorMessage = err.error?.mensaje || 'Credenciales inválidas o error de servidor.';
      }
    });
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}