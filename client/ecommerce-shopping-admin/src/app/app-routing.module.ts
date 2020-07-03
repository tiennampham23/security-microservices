import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from './core/guards/public-api';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@drop-shipping/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [
      AuthenticationGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('@drop-shipping/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
