import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './pages/order/order.component';
import {OrderRoutingModule} from "./order-routing.module";
import {SharedModule} from "../../shared/share.module";



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
