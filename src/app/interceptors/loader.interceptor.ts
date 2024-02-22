import { inject } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ModalService } from '@services/modal.service';
import {
  filter,
  switchMap,
  tap,
  timer
} from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const modalService: ModalService = inject(ModalService);
  modalService.showLoader();

  return timer(1000).pipe(
    switchMap(() => next(req)),
    filter((event: HttpEvent<unknown>) => event.type === HttpEventType.Response),
    tap({finalize: () => modalService.hideLoader()})
  );
};
