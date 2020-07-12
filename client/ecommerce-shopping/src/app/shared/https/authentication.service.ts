import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CredentialsService} from "../singleton-services/public-api";
import {Credentials} from "../models/credentials.model";
import { UserModel } from '../dtos/public-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  public currentUser = this.user.asObservable();

  constructor(
    private credentialsService: CredentialsService
  ) {
  }

  get isAuthenticated(): boolean {
    return !!this.credentialsService.isAuthenticated;
  }

  get credentials(): Credentials | null {
    return this.credentialsService.getCredentials;
  }

  changeCurrentUser(user: UserModel) {
    this.user.next(user);
  }

  login(context: Credentials, remember?: boolean): void {
    this.credentialsService.setCredentials(context, remember);
  }
}
