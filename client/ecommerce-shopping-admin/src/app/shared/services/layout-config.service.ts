import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LayoutConfigModel} from '@drop-shipping/shared/models/public-api';
import {ELocalStorage} from '@drop-shipping/core/constants/public-api';
import * as objectPath from 'object-path';

@Injectable({
  providedIn: 'root'
})
export class LayoutConfigService {
  onConfigUpdated$: Subject<LayoutConfigModel>;
  layoutConfig: LayoutConfigModel;
  constructor() {
    this.onConfigUpdated$ = new Subject<LayoutConfigModel>();
  }

  saveConfig(layoutConfig: LayoutConfigModel) {
    if (layoutConfig) {
      localStorage.setItem(ELocalStorage.LAYOUT_CONFIG, JSON.stringify(layoutConfig));
    }
  }

  getSavedConfig(): LayoutConfigModel {
    const config = localStorage.getItem(ELocalStorage.LAYOUT_CONFIG);
    try {
      return JSON.parse(config);
    } catch (e) {
    }
  }

  removeConfig(): void {
    localStorage.removeItem(ELocalStorage.LAYOUT_CONFIG);
  }

  getConfig(path?: string): LayoutConfigModel | any {
    this.layoutConfig = this.getSavedConfig();

    if (path) {
      // if path is specified, get the value within object
      return objectPath.get(this.layoutConfig, path);
    }

    return this.layoutConfig;
  }

  getLogo(): string {
    const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
    // set brand logo
    const logoObject = objectPath.get(this.layoutConfig, 'self.logo');

    let logo;
    if (typeof logoObject === 'string') {
      logo = logoObject;
    }
    if (typeof logoObject === 'object') {
      logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
    }
    if (typeof logo === 'undefined') {
      try {
        const logos = objectPath.get(this.layoutConfig, 'self.logo');
        logo = logos[Object.keys(logos)[0]];
      } catch (e) {
      }
    }
    return logo;
  }

  getStickyLogo(): string {
    let logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
    if (typeof logo === 'undefined') {
      logo = this.getLogo();
    }
    return logo + '';
  }

  loadConfigs(config: LayoutConfigModel) {
    this.layoutConfig = this.getSavedConfig();
    // use saved config as priority, or load new config if demo does not matched
    if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
      this.layoutConfig = config;
    }
    this.saveConfig(this.layoutConfig);
  }
}
