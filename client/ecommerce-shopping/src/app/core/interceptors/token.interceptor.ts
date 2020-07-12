import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../../shared/https/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = localStorage.getItem('access_token');
    req = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `${authorization}`
      }
    });
    return next.handle(req);
  }
}
