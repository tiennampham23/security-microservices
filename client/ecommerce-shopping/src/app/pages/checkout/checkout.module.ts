import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutRoutingModule} from "./checkout-routing.module";
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/share.module";
import {SnackbarModule} from "../../shared/components/snackbar/snackbar.module";


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SnackbarModule,
    SharedModule
  ]
})
export class CheckoutModule {
}
