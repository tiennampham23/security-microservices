import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductBusinessComponent} from './pages/product-business/product-business.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'create',
    component: ProductBusinessComponent
  },
  {
    path: 'update/:id',
    component: ProductBusinessComponent
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
export class ProductRoutingModule {
}
