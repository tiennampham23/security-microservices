import {Injectable} from '@angular/core';
import {CredentialsService} from '@drop-shipping/shared/singleton-services/public-api';
import {Credentials, UserModel} from '../data-transform-objects/public-api';
import {ELocalStorage} from '@drop-shipping/core/constants/app.constant';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentUser =  this.user.asObservable();

  constructor(
    private credentialsService: CredentialsService
  ) { }

  get isAuthenticated(): boolean {
    return !!this.credentialsService.isAuthenticated;
  }

  get credentials(): Credentials | null {
    return this.credentialsService.getCredentials;
  }

  changeCurrentUser(user: string) {
    this.user.next(user);
  }

  login(context: Credentials, remember?: boolean): void {
    this.credentialsService.setCredentials(context, remember);
  }
}
