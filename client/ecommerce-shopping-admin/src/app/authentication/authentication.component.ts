import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {LayoutConfigService, SplashScreenService, TranslationService} from '@drop-shipping/shared/services/public-api';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit {
  today = Date.now();
  headerLogo: string;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private layoutConfigService: LayoutConfigService,
    private translationService: TranslationService,
    private splashScreenService: SplashScreenService
  ) {
  }

  ngOnInit(): void {
    this.translationService.setLanguage(this.translationService.getSelectedLanguage());
    this.headerLogo = this.layoutConfigService.getLogo();

    this.splashScreenService.hide();
  }

}
