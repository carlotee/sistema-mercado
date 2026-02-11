import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css',
})
export class EditarPerfilComponent implements OnInit {
  // Objeto adaptado a la tabla 'usuarios'
  usuario: any = {
    id_usuario: null,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const session = localStorage.getItem('usuario_mercado');
    if (session) {
      // Cargamos todos los datos actuales para que aparezcan en los inputs
      this.usuario = JSON.parse(session);
    }
  }

  onSubmit() {
    // Llamada al servicio que ahora ya existe
    this.authService.actualizarPerfil(this.usuario).subscribe({
      next: (res) => {
        alert('✅ Todos los campos han sido actualizados con éxito');
        // Actualizamos la sesión local con los nuevos valores
        localStorage.setItem('usuario_mercado', JSON.stringify(this.usuario));
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('❌ No se pudieron guardar los cambios. Revisa la consola.');
      }
    });
  }
}