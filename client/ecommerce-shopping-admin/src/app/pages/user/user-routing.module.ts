import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserOrdersComponent} from './pages/user-orders/user-orders.component';
import {UserTransactionsComponent} from './pages/user-transactions/user-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':userId/orders',
    component: UserOrdersComponent
  },
  {
    path: ':userId/transactions',
    component: UserTransactionsComponent
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
export class UserRoutingModule {
}
