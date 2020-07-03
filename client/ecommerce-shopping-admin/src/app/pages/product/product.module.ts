import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductRoutingModule} from '@drop-shipping/pages/product/product-routing.module';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductBusinessComponent} from './pages/product-business/product-business.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {OrderProductsModule} from '@drop-shipping/shared/components/order-products/order-products.module';
import {SharedModule} from '@drop-shipping/shared/shared.module';


@NgModule({
  declarations: [ProductListComponent, ProductBusinessComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    OrderProductsModule,
    PortletModule,
    PortletHeaderModule,
    PortletBodyModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatRadioModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductModule {
}
