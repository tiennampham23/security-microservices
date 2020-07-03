import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateOrdersStatusComponent } from './update-orders-status.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {SnackbarModule} from '@drop-shipping/shared/ui-common/public-api';
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    UpdateOrdersStatusComponent
  ],
  imports: [
    CommonModule,
    SnackbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class UpdateOrdersStatusModule { }
