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
        path: 'user-profile',
        loadChildren: () => import('@drop-shipping/pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'order',
        loadChildren: () => import('@drop-shipping/pages/order/order.module').then(m => m.OrderModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'order-product',
        loadChildren: () => import('@drop-shipping/pages/order-product/order-product.module').then(m => m.OrderProductModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('@drop-shipping/pages/transaction/transaction.module').then(m => m.TransactionModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('@drop-shipping/pages/notification/notification.module').then(m => m.NotificationModule),
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
