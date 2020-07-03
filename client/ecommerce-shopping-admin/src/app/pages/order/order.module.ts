import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {OrderListComponent} from './pages/order-list/order-list.component';
import {OrderListModule} from '@drop-shipping/shared/components/order-list/order-list.module';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '@drop-shipping/shared/shared.module';


@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        OrderListModule,
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatTableModule,
        SharedModule,
    ]
})
export class OrderModule {
}
