import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToggleDirective} from './directives/toggle.directive';
import {OffCanvasDirective} from './directives/off-canvas.directive';
import {MenuDirective} from './directives/menu.directive';
import {HeaderDirective} from './directives/header.directive';
import {FirstLetterPipe} from './pipes/first-letter.pipe';
import {ContentAnimateDirective} from './directives/content-animate.directive';
import {ScrollTopDirective} from './directives/scroll-top.directive';
import {StickyDirective} from './directives/sticky.directive';
import { TotalPricePipe } from './pipes/total-price.pipe';
import { DecimalFormatPipe } from './pipes/decimal-format.pipe';
import { BindingHtmlPipe } from './pipes/binding-html.pipe';
import { ConvertStringToArrayPipe } from './pipes/convert-string-to-array.pipe';


@NgModule({
  declarations: [
    ToggleDirective,
    OffCanvasDirective,
    MenuDirective,
    HeaderDirective,
    FirstLetterPipe,
    ContentAnimateDirective,
    ScrollTopDirective,
    StickyDirective,
    TotalPricePipe,
    DecimalFormatPipe,
    BindingHtmlPipe,
    ConvertStringToArrayPipe
  ],
    exports: [
        ToggleDirective,
        OffCanvasDirective,
        MenuDirective,
        HeaderDirective,
        FirstLetterPipe,
        ContentAnimateDirective,
        ScrollTopDirective,
        TotalPricePipe,
        DecimalFormatPipe,
        BindingHtmlPipe,
        ConvertStringToArrayPipe
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
