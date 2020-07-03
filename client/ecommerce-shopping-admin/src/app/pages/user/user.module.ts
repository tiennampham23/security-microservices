import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from '@drop-shipping/pages/user/user-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UserBusinessComponent} from './components/user-business/user-business.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertModule} from '@drop-shipping/shared/ui-common/alert/alert.module';
import { AddSubBalanceComponent } from './components/add-sub-balance/add-sub-balance.component';
import {SnackbarModule} from '@drop-shipping/shared/ui-common/public-api';
import { ChangeStatusComponent } from './components/change-status/change-status.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ChangePasswordUserComponent } from './components/change-password-user/change-password-user.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import {OrderListModule} from '@drop-shipping/shared/components/order-list/order-list.module';
import { UserTransactionsComponent } from './pages/user-transactions/user-transactions.component';
import {TransactionListModule} from '@drop-shipping/shared/components/transaction-list/transaction-list.module';
import {SharedModule} from '@drop-shipping/shared/shared.module';



@NgModule({
  declarations: [UserListComponent, UserBusinessComponent, AddSubBalanceComponent, ChangeStatusComponent, ChangePasswordUserComponent, UserOrdersComponent, UserTransactionsComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        PortletModule,
        PortletHeaderModule,
        PortletBodyModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        ReactiveFormsModule,
        AlertModule,
        SnackbarModule,
        MatProgressBarModule,
        OrderListModule,
        TransactionListModule,
        SharedModule
    ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
  ]
})
export class UserModule { }
