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

  actualizarPerfil(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${userData.id_usuario}`, userData);
  }

  finalizarCompra(datosPedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pedidos/finalizar-compra`, datosPedido);
  }

  // ⬇️ NUEVAS FUNCIONES PARA PRODUCTOS

  /**
   * Envía el FormData con los datos del producto y la imagen al servidor
   * Se usa en el Dashboard de Carlos Vega
   */
  crearProducto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/productos`, formData);
  }

  /**
   * Trae la lista de productos activos de market_db
   * Se usa tanto en el Dashboard como en la Vista de Clientes
   */
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/productos`);
  }
}