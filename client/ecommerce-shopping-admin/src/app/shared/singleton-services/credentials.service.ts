import {Injectable} from '@angular/core';
import {Credentials} from '@drop-shipping/shared/data-transform-objects/public-api';
import {ELocalStorage} from '@drop-shipping/core/constants/public-api';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private credentials: Credentials | null = null;
  constructor() {
    const savedCredentials = sessionStorage.getItem(ELocalStorage.CURRENT_USER) || localStorage.getItem(ELocalStorage.CURRENT_USER);
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
  }

  get isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get getCredentials(): Credentials | null {
    const savedCredentials =
      sessionStorage.getItem(ELocalStorage.CURRENT_USER) ||
      localStorage.getItem(ELocalStorage.CURRENT_USER);
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
    return this.credentials;
  }

  setCredentials(credentials?: Credentials, remember?: boolean) {
    this.credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(ELocalStorage.CURRENT_USER, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(ELocalStorage.CURRENT_USER);
      localStorage.removeItem(ELocalStorage.CURRENT_USER);
      localStorage.clear();
    }
  }
}
