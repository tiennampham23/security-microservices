import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderProductRoutingModule} from './order-product-routing.module';
import { OrderProductsComponent } from './pages/order-products/order-products.component';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SnackbarModule} from '@drop-shipping/shared/ui-common/public-api';
import {SharedModule} from '@drop-shipping/shared/shared.module';



@NgModule({
  declarations: [OrderProductsComponent],
    imports: [
        CommonModule,
        OrderProductRoutingModule,
        PortletHeaderModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        PortletBodyModule,
        PortletModule,
        MatSelectModule,
        SnackbarModule,
        SharedModule
    ]
})
export class OrderProductModule { }
