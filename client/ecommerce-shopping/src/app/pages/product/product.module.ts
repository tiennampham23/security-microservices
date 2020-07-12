import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {ProductRoutingModule} from "./product-routing.module";



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
