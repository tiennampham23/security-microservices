import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./pages/order/order.component";

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
