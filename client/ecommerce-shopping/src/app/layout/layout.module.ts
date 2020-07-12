import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {FooterModule} from "./footer/footer.module";
import {TopNavbarModule} from "./top-navbar/top-navbar.module";
import {LayoutRoutingModule} from "./layout-routing.module";


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FooterModule,
    TopNavbarModule
  ]
})
export class LayoutModule {
}
