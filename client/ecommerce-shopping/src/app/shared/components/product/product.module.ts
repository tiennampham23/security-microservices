import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {SharedModule} from "../../share.module";



@NgModule({
    declarations: [ProductComponent],
    exports: [
        ProductComponent
    ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductModule { }
