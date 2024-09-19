import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ManejoErrorServi } from '../../shared/ManejoError.service';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Métodos para manejar el personal
  crearPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personal`, data, { headers: this.headers });
  }

  obtenerPersonal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal`, { observe: 'response' }).pipe(
      map(response => {
        // Ahora response es de tipo HttpResponse, por lo que tiene una propiedad status
        if (response.status === 200) {
          return response.body; // Devuelve el cuerpo de la respuesta si todo está bien
        } else {
          // Maneja otros estados de respuesta si es necesario
          return throwError(() => new Error(`Estado inesperado: ${response.status}`));
        }
      }),
      catchError(ManejoErrorServi.gestionarError)
    );
  }

  obtenerPersonalPorMatricula(matricula: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal/${matricula}`);
  }

  actualizarPersonalPorMatricula(MATRICULA: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personal/${MATRICULA}`, data, { headers: this.headers });
  }

  // Inicio de sesión
  iniciarSesion(correo: string, password: string): Observable<any> {
    const body = { CORREO: correo, PASSWORD: password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers: this.headers, observe: 'response' }).pipe(
      map(response => {
        // Verifica si el estado HTTP es 200
        if (response.status === 200) {
          console.log('consulta:', response);
          return response.body; // Devuelve el cuerpo de la respuesta si todo está bien
        } else {
          // Maneja otros estados de respuesta si es necesario
          console.log('error consulta:', response);
          return throwError(() => new Error(`Estado inesperado: ${response.status}`));
        }
      }),
      catchError(ManejoErrorServi.gestionarError)
    );
  }
}
