import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {LayoutConfigService, SplashScreenService, TranslationService} from '@drop-shipping/shared/services/public-api';
import {enLang, frLang} from '@drop-shipping/core/i18n/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loader: boolean;
  title = 'DropShipping';
  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService,
    private translationService: TranslationService
  ) {
    // register translations
    this.translationService.loadTranslations(enLang, frLang);
  }


  ngOnInit(): void {
    this.onConfigLayout();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  private onConfigLayout() {
    this.loader = this.layoutConfigService.getConfig('loader.enabled');
    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('kt-page--loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }
}
