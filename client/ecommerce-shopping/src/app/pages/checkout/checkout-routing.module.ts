import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CheckoutComponent} from "./pages/checkout/checkout.component";

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule {
}
