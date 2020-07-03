import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnviromentService} from '@drop-shipping/shared/https/public-api';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
    private envService: EnviromentService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: this.envService.baseUrl + request.url
      });
    }
    return next.handle(request);
  }
}
