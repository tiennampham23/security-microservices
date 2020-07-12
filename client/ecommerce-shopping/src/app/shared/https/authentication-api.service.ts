import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BaseService} from './base.service';


const router = {
  login: `/auth`,
  loadCurrentUser: `/get-current-user`,
  register: `/auth/signUp`
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  constructor(
    private httpClient: BaseService
  ) { }

  login(username: string, password: string) {
    if (!username || !password) {
      return of(null);
    }
    return this.httpClient.post(router.login, {username, password});

  }

  register(
    body: {
      username: string,
      password: string,
      rePassword: string,
      email: string,
      phone: string,
      name: string
    }
  ) {
  return this.httpClient.post(router.register, body);
  }

  loadCurrentUser() {
    return this.httpClient.get(router.loadCurrentUser);
  }
}
