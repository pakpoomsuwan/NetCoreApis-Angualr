import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const url = `${environment.baseAPIURL}`
    const urlReq = req.clone({ url: `${url}${req.url}` });

    return next.handle(urlReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
                this.authService.logout();
            }
          }
        }
      )
    );
  }

  constructor(private authService: AuthService) { }
}
