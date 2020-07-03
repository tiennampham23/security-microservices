import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayReportNumberComponent } from './display-report-number.component';
import {SharedModule} from "@drop-shipping/shared/shared.module";
import {DisplayChartModule} from "@drop-shipping/shared/components/display-chart/display-chart.module";



@NgModule({
  declarations: [DisplayReportNumberComponent],
  exports: [
    DisplayReportNumberComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        DisplayChartModule
    ]
})
export class DisplayReportNumberModule { }
