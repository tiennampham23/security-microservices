import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {EnviromentService} from './enviroment.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private readonly httpHeaders: HttpHeaders;
  private readonly httpOptions;

  private static extractData(res: HttpResponse<object>) {
    return res || {};
  }

  constructor(
    private httpClient: HttpClient,
    private envService: EnviromentService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      }),
    };
    this.httpHeaders = new HttpHeaders(this.httpOptions);
  }

  get(uri: string, params?: HttpParams) {
    return this.httpClient
      .get(uri, {headers: this.httpHeaders, params})
      .pipe(map(BaseService.extractData));
  }

  // api post method
  post(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .post(uri, data, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(map(BaseService.extractData));
  }

  // api post method form-data
  postFormData(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .post(uri, data, {
        params,
      })
      .pipe(map(BaseService.extractData));
  }

  // api put method form-data
  putFormData(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .put(uri, data, {
        params,
      })
      .pipe(map(BaseService.extractData));
  }

  // api put method
  put(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .put(uri, data, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(map(BaseService.extractData));
  }

  // put blob
  putDownloadFile(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient.put(uri, data, {
      headers: this.httpHeaders,
      responseType: 'blob' as 'json',
      params,
    });
  }

  // get blob
  getDownLoadFile(uri: string, params?: HttpParams) {
    return this.httpClient.get(uri, {
      headers: this.httpHeaders,
      responseType: 'blob' as 'json',
      params,
    });
  }

  // api delete method
  delete(uri: string, params?: HttpParams) {
    return this.httpClient
      .delete(`${uri}`, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(map(BaseService.extractData));
  }
}
