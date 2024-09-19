import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { constantesGlobales } from './global.constants';

export class ManejoErrorServi {

  // Método estático para manejar errores
  static gestionarError(error: HttpErrorResponse) {
    let mensajeError = constantesGlobales.ERROR_SERVIDOR;

    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      mensajeError = error.error.message;
    } else {
      // Errores del lado del servidor
      mensajeError = error.error.message;
    }

    return throwError(() => new Error(mensajeError));
  }
}
