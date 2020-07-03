import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PortletModule} from "@drop-shipping/shared/ui-common/portlet/portlet.module";
import {PortletBodyModule} from "@drop-shipping/shared/ui-common/portlet-body/portlet-body.module";
import {DisplayReportNumberModule} from "@drop-shipping/shared/components/display-report-number/display-report-number.module";
import {PortletHeaderModule} from "@drop-shipping/shared/ui-common/portlet-header/portlet-header.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {OrderListModule} from "@drop-shipping/shared/components/order-list/order-list.module";
import {DisplayChartModule} from "@drop-shipping/shared/components/display-chart/display-chart.module";
import {TransactionTimelineModule} from "@drop-shipping/shared/components/transaction-timeline/transaction-timeline.module";
import {SharedModule} from "@drop-shipping/shared/shared.module";
import {PortletFooterModule} from "@drop-shipping/shared/ui-common/portlet-footer/portlet-footer.module";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PortletModule,
    PortletBodyModule,
    DisplayReportNumberModule,
    PortletHeaderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    OrderListModule,
    DisplayChartModule,
    TransactionTimelineModule,
    SharedModule,
    PortletFooterModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
