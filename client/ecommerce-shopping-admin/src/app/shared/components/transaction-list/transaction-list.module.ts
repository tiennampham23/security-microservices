import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list.component';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';
import {SharedModule} from '@drop-shipping/shared/shared.module';



@NgModule({
  declarations: [TransactionListComponent],
  exports: [
    TransactionListComponent
  ],
    imports: [
        CommonModule,
        PortletHeaderModule,
        PortletModule,
        PortletBodyModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        SharedModule
    ]
})
export class TransactionListModule { }
