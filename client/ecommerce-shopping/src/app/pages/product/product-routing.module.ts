import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";

const routes: Routes = [
  {
    path: 'product-detail',
    component: ProductDetailComponent
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
export class ProductRoutingModule {
}
