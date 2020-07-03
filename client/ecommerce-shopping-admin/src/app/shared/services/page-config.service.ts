// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import * as objectPath from 'object-path';

@Injectable({
  providedIn: 'root'
})
export class PageConfigService {
  onConfigUpdated$: Subject<any>;
  pageConfig: any;

  constructor(private router: Router) {
    // register on config changed event and set default config
    this.onConfigUpdated$ = new Subject();
  }

  /**
   * Get current page config based on route
   */
  getCurrentPageConfig(path?: string): any {
    let configPath = this.cleanUrl(this.router.url);

    if (path) {
      configPath += '.' + path;
    }

    // get page config by path
    return objectPath.get(this.pageConfig, configPath);
  }


  loadConfigs(config: any) {
    this.pageConfig = config;
    this.onConfigUpdated$.next(this.pageConfig);
  }

  cleanUrl(url: string): string {
    // remove first route (demo name) from url router
    if (new RegExp(/^\/demo/).test(url)) {
      const urls = url.split('/');
      urls.splice(0, 2);
      url = urls.join('/');
    }

    if (url.charAt(0) === '/') {
      url = url.substr(1);
    }

    let finalUrl = url.replace(/\//g, '.');
    if (finalUrl.indexOf('?') !== -1) {
      finalUrl = finalUrl.substring(0, finalUrl.indexOf('?'));
    }

    return finalUrl;
  }
}
