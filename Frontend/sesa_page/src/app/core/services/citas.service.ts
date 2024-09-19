import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ManejoErrorServi } from '../../shared/ManejoError.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = `${environment.apiUrl}/citas`;  // URL base de la API de citas
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Crear una nueva cita
  crearCita(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)  // Usa la función de manejo de errores
    );
  }

  // Obtener todas las citas
  obtenerCitas(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map(response => {
        // Aquí puedes transformar la respuesta si es necesario
        return response;
      }),
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Obtener una cita por ID
  obtenerCitaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Actualizar una cita por ID
  actualizarCita(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }
}
