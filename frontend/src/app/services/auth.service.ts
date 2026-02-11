import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  registro(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  // 🆕 FUNCIÓN PARA EDITAR TODO EL PERFIL
  actualizarPerfil(userData: any): Observable<any> {
    // Usamos el id_usuario para la ruta del backend
    return this.http.put(`${this.apiUrl}/usuarios/${userData.id_usuario}`, userData);
  }
}