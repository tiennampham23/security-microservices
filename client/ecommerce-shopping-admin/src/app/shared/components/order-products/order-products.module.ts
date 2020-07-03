import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProductsComponent } from './order-products.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [OrderProductsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class OrderProductsModule {
}
