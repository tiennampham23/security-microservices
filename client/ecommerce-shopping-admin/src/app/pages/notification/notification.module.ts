import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './pages/notification-list/notification-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {NotificationRoutingModule} from './notification-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {SnackbarModule} from "@drop-shipping/shared/ui-common/public-api";
import { NotificationBusinessComponent } from './pages/notification-business/notification-business.component';
import {QuillModule} from "ngx-quill";
import { NotificationDetailComponent } from './pages/notification-detail/notification-detail.component';
import {SharedModule} from "@drop-shipping/shared/shared.module";



@NgModule({
  declarations: [NotificationListComponent, NotificationBusinessComponent, NotificationDetailComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SnackbarModule,
    QuillModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    PortletModule,
    PortletHeaderModule,
    PortletBodyModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule
  ]
})
export class NotificationModule { }
