import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "@drop-shipping/shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class OrderDetailModule { }
