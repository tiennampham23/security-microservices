import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTimelineComponent } from './transaction-timeline.component';



@NgModule({
  declarations: [TransactionTimelineComponent],
  exports: [
    TransactionTimelineComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TransactionTimelineModule { }
