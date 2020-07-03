import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from '@drop-shipping/layout/layout-routing.module';
import {LayoutComponent} from './layout.component';
import {HeaderMobileComponent} from './components/header-mobile/header-mobile.component';
import {SharedModule} from '@drop-shipping/shared/shared.module';
import {AsideComponent} from './components/aside/aside.component';
import {BrandComponent} from './components/brand/brand.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HeaderComponent} from './components/header/header.component';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TopBarComponent} from './components/topbar/top-bar.component';
import {SearchDropdownComponent} from './components/search-dropdown/search-dropdown.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {NotificationComponent} from './components/notification/notification.component';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ScrollTopComponent} from './components/scroll-top/scroll-top.component';
import {TranslateModule} from '@ngx-translate/core';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SnackbarModule} from '@drop-shipping/shared/ui-common/public-api';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderMobileComponent,
    AsideComponent,
    BrandComponent,
    HeaderComponent,
    TopBarComponent,
    SearchDropdownComponent,
    SearchResultComponent,
    NotificationComponent,
    LanguageSelectorComponent,
    UserProfileComponent,
    ScrollTopComponent,
    ChangeAvatarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    InlineSVGModule,
    LoadingBarModule,
    SnackbarModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbDropdownModule,
    TranslateModule.forChild(),
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
  ]
})
export class LayoutModule {
}
