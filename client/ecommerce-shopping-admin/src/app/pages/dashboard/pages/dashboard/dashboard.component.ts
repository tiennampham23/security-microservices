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
  transactions: TransactionModel[];

  currentUser: UserModel;
  totalTransactions = 0;

  totalUsage = 0;

  successOrders = 0;

  waitOrders = 0;

  cancelOrders = 0;

  filterUsage: {
    fromDate: string,
    toDate: string
  } = {
    fromDate: null,
    toDate: null
  };

  filterTransactions: {
    page: number,
    size: number,
    userId: string,
    fromDate: string,
    toDate: string,
    createdAt: string,
    typeId: number
  } = {
    page: 1,
    size: 5,
    userId: null,
    fromDate: null,
    toDate: null,
    createdAt: null,
    typeId: null
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private transactionService: TransactionService,
    private authService: AuthenticationService
  ) {
    this.filterUsage.toDate = convertStrToYYMMdd(new Date());
    this.filterUsage.fromDate = convertStrToYYMMdd(new Date(2020, 0, 1));

    this.filterTransactions.fromDate = convertStrToYYMMdd(new Date(2020, 0, 1));
    this.filterTransactions.toDate = convertStrToYYMMdd(new Date());
  }

  private destroyed$ = new Subject();

  ngOnInit(): void {
    this.loadUsage();
    this.loadSuccessOrders();
    this.loadWaitOrders();
    this.loadCancelOrders();
    this.loadTransactions(this.filterTransactions);
    this.subscribePaginator();
    this.loadCurrentUser();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadUsage() {
    const totalUsage$ = this.dashboardService.loadUsage(this.filterUsage)
      .pipe(takeUntil(this.destroyed$));
    totalUsage$.subscribe((res: {data: number}) => {
      this.totalUsage = res.data;
    });
  }

  private loadSuccessOrders() {
    const filter = {
      toDate: convertStrToYYMMdd(new Date()),
      fromDate: convertStrToYYMMdd(new Date(2020, 0, 1)),
      statusId: '3'
    }
    const successOrders$ = this.dashboardService.loadOrderByFilter(filter)
      .pipe(takeUntil(this.destroyed$));
    successOrders$.subscribe((res: {data: number}) => {
      this.successOrders = res.data;
    });
  }

  private loadWaitOrders() {
    const filter = {
      toDate: convertStrToYYMMdd(new Date()),
      fromDate: convertStrToYYMMdd(new Date(2020, 0, 1)),
      statusId: '0'
    }
    const waitOrders$ = this.dashboardService.loadOrderByFilter(filter)
      .pipe(takeUntil(this.destroyed$));
    waitOrders$.subscribe((res: {data: number}) => {
      this.waitOrders = res.data;
    });
  }

  private loadCancelOrders() {
    const filter = {
      toDate: convertStrToYYMMdd(new Date()),
      fromDate: convertStrToYYMMdd(new Date(2020, 0, 1)),
      statusId: '7'
    }
    const cancelOrder$ = this.dashboardService.loadOrderByFilter(filter)
      .pipe(takeUntil(this.destroyed$));
    cancelOrder$.subscribe((res: {data: number}) => {
      this.cancelOrders = res.data;
    });
  }

  private loadTransactions(filterTransactions: {
    page: number;
    size: number;
    userId: string;
    fromDate: string;
    toDate: string;
    createdAt: string;
    typeId: number
  }) {
    const transactions$ = this.transactionService.loadTransactions(filterTransactions)
      .pipe(takeUntil(this.destroyed$));
    transactions$.subscribe((res:ResponseHttp<TransactionModel[]>) => {
      this.transactions = res.data;
      this.totalTransactions = res.total;
    });
  }

  private subscribePaginator() {
    this.paginator.page.pipe(takeUntil(this.destroyed$)).subscribe(($event) => {
      this.filterTransactions.page = ($event.pageIndex + 1);
      this.loadTransactions(this.filterTransactions);
    });
  }

  private loadCurrentUser() {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }
}
