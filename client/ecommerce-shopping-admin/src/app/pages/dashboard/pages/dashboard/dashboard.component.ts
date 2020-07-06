import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "@drop-shipping/shared/https/dashboard.service";
import {Subject} from "rxjs";
import {convertStrToYYMMdd} from "@drop-shipping/core/utils/helper.utils";
import {distinctUntilChanged, skip, takeUntil} from "rxjs/operators";
import {TransactionService} from "@drop-shipping/shared/https/transaction.service";
import {ResponseHttp} from "@drop-shipping/shared/data-transform-objects/response-http.model";
import {TransactionModel} from "@drop-shipping/shared/data-transform-objects/transaction.model";
import {MatPaginator} from "@angular/material/paginator";
import {ESort} from "@drop-shipping/core/constants/app.constant";
import {AuthenticationService} from "@drop-shipping/shared/https/authentication.service";
import {UserModel} from "@drop-shipping/shared/data-transform-objects/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {



  constructor(
  ) {

  }

  private destroyed$ = new Subject();

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
