import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { GlobalService } from 'src/app/services/global.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _globalService: GlobalService, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._globalService.getToken()
    let clone = request

    if (request.url.includes(`${environment.API_URL}`)) {
      clone = request.clone({
        headers: request.headers.set('Authorization', `${token}`)
      })
    }

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'ERREUR'
        switch (error.status) {

          case 400: message = "Bad request"
            break;

          case 401: message = "Unauthorizated"
            break;

          default:
            break;

        }

        this.snackBar.open(message, 'ok', { verticalPosition: 'top' })
        return next.handle(clone)
      })

    )
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}

