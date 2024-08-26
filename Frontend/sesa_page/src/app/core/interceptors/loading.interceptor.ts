import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';

import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = Inject(BusyService)
  
  busyService.busy();

  return next(req).pipe(
    delay(2000),
    finalize(()=> busyService.idle())
  );
};
