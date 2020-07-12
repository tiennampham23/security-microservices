import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  private BASE_URL: string;
  constructor() {
    this.BASE_URL = environment.baseUrl;
  }

  get baseUrl() {
    return this.BASE_URL;
  }

  set baseUrl(url: string) {
    this.BASE_URL = url;
  }
}
