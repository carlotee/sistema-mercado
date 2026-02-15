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
      const datosCargados = JSON.parse(session);
      
      /** * REVISIÓN DE ESTRUCTURA:
       * Si guardaste la respuesta completa del login, el ID está en datosCargados.usuario.id_usuario.
       * Si guardaste solo el usuario, está en datosCargados.id_usuario.
       */
      const infoUsuario = datosCargados.usuario ? datosCargados.usuario : datosCargados;

      // Asignamos los datos al formulario
      this.usuario = { ...infoUsuario };

      // Forzamos la asignación del ID para que la URL sea /usuarios/1 y no /null
      this.usuario.id_usuario = infoUsuario.id_usuario;

      console.log('ID detectado para la actualización:', this.usuario.id_usuario);
    }
  }

  onSubmit() {
    // Si el ID sigue siendo null, bloqueamos el envío para evitar el error 404
    if (!this.usuario.id_usuario) {
      alert('❌ Error: El ID del usuario no se cargó. Cierra sesión y vuelve a entrar.');
      return;
    }

    this.authService.actualizarPerfil(this.usuario).subscribe({
      next: (res) => {
        alert('✅ Perfil actualizado con éxito en Market Pro');
        
        // Actualizamos el localStorage para que el nombre nuevo se vea en el Navbar
        localStorage.setItem('usuario_mercado', JSON.stringify(this.usuario));
      },
      error: (err) => {
        console.error('Error detallado:', err);
        alert('❌ No se pudo actualizar. Verifica que el servidor Node.js esté corriendo.');
      }
    });
  }
}