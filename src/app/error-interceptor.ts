import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from '../../node_modules/rxjs/operators';
import { throwError } from '../../node_modules/rxjs';

export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        alert(error.error.message);
        return throwError(error);
      })
    );
  }
}
