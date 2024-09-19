import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ManejoErrorServi } from '../../shared/ManejoError.service';
import { constantesGlobales } from '../../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl = `${environment.apiUrl}/pacientes`;  // URL base de la API de pacientes
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo paciente
  crearPaciente(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)  // Usa la función de manejo de errores
    );
  }

  // Leer todos los pacientes
  obtenerPacientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map(response => {
        // Aquí puedes transformar la respuesta si es necesario
        return response;
      }),
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Leer un paciente por ID
  obtenerPacientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Actualizar un paciente por ID
  actualizarPaciente(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }
}
