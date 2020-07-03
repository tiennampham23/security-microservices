import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ChangeProfileComponent} from './pages/change-profile/change-profile.component';

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'change-profile',
    component: ChangeProfileComponent
  },
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
export class UserProfileRoutingModule {
}
