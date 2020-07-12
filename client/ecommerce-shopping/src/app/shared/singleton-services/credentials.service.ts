import {Injectable} from '@angular/core';
import { Credentials } from '../models/credentials.model';
import {ELocalStorage} from "../../core/constants/app.constant";

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
