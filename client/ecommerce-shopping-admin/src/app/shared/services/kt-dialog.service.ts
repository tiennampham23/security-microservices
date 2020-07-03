import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

declare var KTDialog;
@Injectable({
  providedIn: 'root'
})
export class KtDialogService {
  private ktDialog: any;
  private currentState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Public properties
  constructor() {
    this.ktDialog = new KTDialog({type: 'loader', placement: 'top center', message: 'Loading ...'});
  }

  show() {
    this.currentState.next(true);
    this.ktDialog.show();
  }

  hide() {
    this.currentState.next(false);
    this.ktDialog.hide();
  }

  checkIsShown() {
    return this.currentState.value;
  }
}
