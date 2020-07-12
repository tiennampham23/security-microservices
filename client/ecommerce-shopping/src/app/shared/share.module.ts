import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindingHtmlPipe } from './pipes/binding-html.pipe';
import { DecimalFormatPipe, FirstLetterPipe, TotalPricePipe} from "./pipes/public-api";






@NgModule({
  declarations: [
    FirstLetterPipe,
    TotalPricePipe,
    DecimalFormatPipe,
    BindingHtmlPipe,
  ],
  exports: [
    FirstLetterPipe,
    TotalPricePipe,
    DecimalFormatPipe,
    BindingHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
