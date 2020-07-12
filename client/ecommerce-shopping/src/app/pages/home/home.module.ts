import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {ListProductsModule} from "../../shared/components/list-products/list-products.module";
import {MatButtonModule} from "@angular/material/button";
import {ProductModule} from "../../shared/components/product/product.module";



@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ListProductsModule,
        MatButtonModule,
        ProductModule
    ]
})
export class HomeModule { }
