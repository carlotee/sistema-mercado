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
  // Objeto adaptado exactamente a las columnas de tu tabla 'usuarios'
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
    // 1. Obtenemos los datos guardados al iniciar sesión
    const session = localStorage.getItem('usuario_mercado');
    
    if (session) {
      const datosSesion = JSON.parse(session);
      
      // 2. Cargamos todos los datos en el objeto del formulario
      this.usuario = { ...datosSesion };

      // 3. REFUERZO DE SEGURIDAD: Aseguramos que el ID no sea null
      // MySQL usa 'id_usuario', pero lo validamos por si acaso se guardó como 'id'
      this.usuario.id_usuario = datosSesion.id_usuario || datosSesion.id;

      // Log para que verifiques en la consola del navegador que el ID ya no es null
      console.log('ID listo para la actualización:', this.usuario.id_usuario);
    }
  }

  onSubmit() {
    // 4. Verificación preventiva antes de enviar al backend
    if (!this.usuario.id_usuario) {
      alert('❌ Error: No se encontró el ID del usuario. Por favor, re-inicia sesión.');
      return;
    }

    // 5. Enviamos la petición PUT al servidor de Node.js
    this.authService.actualizarPerfil(this.usuario).subscribe({
      next: (res) => {
        alert('✅ Perfil actualizado con éxito en Market Pro');
        
        // 6. Actualizamos el localStorage para que los cambios se reflejen en todo el sistema
        localStorage.setItem('usuario_mercado', JSON.stringify(this.usuario));
      },
      error: (err) => {
        console.error('Error detallado al guardar:', err);
        alert('❌ No se pudieron guardar los cambios. Revisa que el servidor esté encendido.');
      }
    });
  }
}