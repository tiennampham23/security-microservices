import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@drop-shipping/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'product',
        loadChildren: () => import('@drop-shipping/pages/product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'order',
        loadChildren: () => import('@drop-shipping/pages/order/order.module').then(m => m.OrderModule),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
