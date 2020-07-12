import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private currentUser = new Subject<string>();

  public currentUserStream$ = this.currentUser.asObservable();

  broadcastCurrentUserChange(user: string) {
    this.currentUser.next(user);
  }
  constructor() { }
}
