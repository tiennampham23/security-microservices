import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationListComponent} from './pages/notification-list/notification-list.component';
import {NotificationBusinessComponent} from "./pages/notification-business/notification-business.component";
import {NotificationDetailComponent} from "./pages/notification-detail/notification-detail.component";

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  },
  {
    path: 'create',
    component: NotificationBusinessComponent
  },
  {
    path: 'update/:id',
    component: NotificationBusinessComponent
  },
  {
    path: ':id',
    component: NotificationDetailComponent
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
export class NotificationRoutingModule {
}
