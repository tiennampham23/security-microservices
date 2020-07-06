import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from "@drop-shipping/core/guards/public-api";

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
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('@drop-shipping/pages/user/user.module').then(m => m.UserModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('@drop-shipping/pages/order/order.module').then(m => m.OrderModule),
        canActivate: [AuthorizationGuard]
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
