import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const token = localStorage.getItem(environment.keyLocalAuthenInfo);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'bearer ' + token)
    });
    return next.handle(authReq);
  }

  constructor() { }
}
