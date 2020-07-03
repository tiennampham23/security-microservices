import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutConfigService, SplashScreenService} from '@drop-shipping/shared/services/public-api';
import * as objectPath from 'object-path';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  loaderLogo: string;
  loaderType: string;
  loaderMessage: string;
  @ViewChild('splashScreen', {static: true}) splashScreen: ElementRef;
  constructor(
    private el: ElementRef,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService
  ) { }

  ngOnInit(): void {
    const loaderConfig = this.layoutConfigService.getConfig('loader');
    this.loaderLogo = objectPath.get(loaderConfig, 'logo');
    this.loaderType = objectPath.get(loaderConfig, 'type');
    this.loaderMessage = objectPath.get(loaderConfig, 'message');

    this.splashScreenService.init(this.splashScreen);
  }

}
