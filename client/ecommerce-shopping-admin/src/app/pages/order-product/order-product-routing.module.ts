import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrderProductsComponent} from './pages/order-products/order-products.component';

const routes: Routes = [
  {
    path: '',
    component: OrderProductsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderProductRoutingModule { }
