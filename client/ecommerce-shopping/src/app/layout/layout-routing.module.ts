import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../app/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../pages/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../pages/order/order.module').then(m => m.OrderModule)
      }
    ]
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
export class LayoutRoutingModule {
}
