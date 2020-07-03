import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SplashScreenModule} from '@drop-shipping/shared/components/splash-screen/splash-screen.module';
import {TranslateModule} from '@ngx-translate/core';
import {initializeLayoutConfig} from '@drop-shipping/core/functions/public-api';
import {LayoutConfigService} from '@drop-shipping/shared/services/public-api';
import {InlineSVGModule} from 'ng-inline-svg';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '@drop-shipping/core/core.module';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    QuillModule.forRoot(),
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
