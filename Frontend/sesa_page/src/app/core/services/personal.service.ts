import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = environment.apiUrl
  // Configura los encabezados
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Personal
  crearPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personal`, data, { headers: this.headers });
  }

  obtenerPersonal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal`);
  }

  obtenerPersonalPorMatricula(matricula: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal/${matricula}`);
  }

  actualizarPersonalPorMatricula(matricula: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personal/${matricula}`, data, { headers: this.headers });
  }

  // Inicio de sesión
  iniciarSesion(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { CORREO: correo, PASSWORD: password }, { headers: this.headers });
  }

}
