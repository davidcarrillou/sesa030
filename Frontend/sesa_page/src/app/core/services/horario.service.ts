import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ManejoErrorServi } from '../../shared/ManejoError.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = `${environment.apiUrl}/horarios`;  // URL base de la API de horarios
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo horario de atención
  crearHorario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)  // Usa la función de manejo de errores
    );
  }

  // Obtener todos los horarios de atención
  obtenerHorarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map(response => {
        // Aquí puedes transformar la respuesta si es necesario
        return response;
      }),
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Obtener un horario de atención por ID
  obtenerHorarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  // Actualizar un horario de atención por ID
  actualizarHorario(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.headers }).pipe(
      catchError(ManejoErrorServi.gestionarError)
    );
  }
}
