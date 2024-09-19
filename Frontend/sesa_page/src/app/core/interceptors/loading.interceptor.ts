import { HttpInterceptorFn } from '@angular/common/http'; 
import { inject } from '@angular/core'; // Usa minúscula para la función inject
import { finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService); // Correctamente inyecta el servicio

  busyService.busy(); // Llama al método busy() para mostrar el spinner

  return next(req).pipe(
    finalize(() => busyService.idle()) // Llama a idle() para ocultar el spinner cuando la solicitud finaliza
  );
};
