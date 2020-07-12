import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products.component';
import {ProductModule} from "../product/product.module";



@NgModule({
  declarations: [ListProductsComponent],
  exports: [
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    ProductModule
  ]
})
export class ListProductsModule { }
