import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransactionRoutingModule} from './transaction-routing.module';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import {TransactionListModule} from '@drop-shipping/shared/components/transaction-list/transaction-list.module';



@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TransactionListModule
  ]
})
export class TransactionModule { }
