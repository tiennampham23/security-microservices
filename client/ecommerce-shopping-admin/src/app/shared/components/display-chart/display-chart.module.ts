import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayChartComponent } from './display-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";



@NgModule({
  declarations: [DisplayChartComponent],
  exports: [
    DisplayChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class DisplayChartModule { }
