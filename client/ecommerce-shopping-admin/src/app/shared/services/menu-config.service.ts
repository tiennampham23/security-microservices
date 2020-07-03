import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {
  onConfigUpdated$: Subject<any>;

  private menuConfig: any;

  constructor() {
    this.onConfigUpdated$ = new Subject<any>();
  }

  getMenus() {
    return this.menuConfig;
  }

  loadConfigs(config) {
    this.menuConfig = config;
    this.onConfigUpdated$.next(this.menuConfig);
  }
}
