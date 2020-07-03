import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderDataSource} from '@drop-shipping/shared/data-sources/order.datasource';
import {OrderModel, UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {StatusModel} from '@drop-shipping/shared/data-transform-objects/status.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {OrderService} from '@drop-shipping/shared/https/order.service';
import {StatusService} from '@drop-shipping/shared/https/status.service';
import {ESort, EStatusOrders} from '@drop-shipping/core/constants/app.constant';
import {convertStrToYYMMdd} from '@drop-shipping/core/utils/helper.utils';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {MatDialog} from '@angular/material/dialog';
import {UpdateOrdersStatusComponent} from '../update-orders-status/update-orders-status.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '@drop-shipping/shared/https/authentication.service';
import {saveAs} from 'file-saver';
import {OrderDetailComponent} from "@drop-shipping/pages/order/components/order-detail/order-detail.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() userId: string;
  @Input() portletClass: string;
  dataSource: OrderDataSource;
  orders: OrderModel[];
  listStatus: StatusModel[];
  currentRole: number;
  displayedColumns = [
    'select',
    'code',
    'username',
    'deliveryAgent',
    'deliveryCode',
    'totalValue',
    'createdAt',
    'statusName',
    'actions'
  ];
  filterOrders: {
    userId: string,
    statusId: string,
    fromDate: string,
    createdAt: string,
    toDate: string,
    _keyword: string,
    page: string,
    size: string
  } = {
    userId: null,
    statusId: null,
    fromDate: null,
    createdAt: null,
    toDate: null,
    _keyword: null,
    page: '1',
    size: '5'
  };

  searchOrderFormGroup: FormGroup;

  selection = new SelectionModel<OrderModel>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;
  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private orderService: OrderService,
    private statusService: StatusService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.initialForm();
  }

  ngOnChanges() {
    if (this.userId) {
      this.filterOrders.userId = this.userId;
    }
  }

  ngOnInit(): void {
    this.dataSource = new OrderDataSource(this.orderService);
    this.loadListOrders(this.filterOrders);
    this.loadListStatus();
    this.subscribePaginator();
    this.subscribeSort();
    this.loadCurrentRole();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.orders.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.orders.forEach(row => this.selection.select(row));
    }
  }

  getItemCssClassByStatus(status: string) {
    switch (status) {
      case EStatusOrders.CANCEL:
      case EStatusOrders.CHANGED:
      case EStatusOrders.RETURN:
        return 'danger';
      case EStatusOrders.SUCCESS:
      case EStatusOrders.PACKAGED:
      case EStatusOrders.WAIT:
        return 'success';
      case EStatusOrders.SHIPPING:
      case EStatusOrders.OTHER_REQUIREMENT:
        return 'metal';
    }
    return '';
  }

  onSearchOrders() {
    this.filterOrders._keyword = this.searchOrderFormGroup.controls.keywords.value;
    this.filterOrders.statusId = this.searchOrderFormGroup.controls.status.value;
    this.filterOrders.fromDate = convertStrToYYMMdd(this.searchOrderFormGroup.controls.startDate.value);
    this.filterOrders.toDate = convertStrToYYMMdd(this.searchOrderFormGroup.controls.endDate.value);

    this.loadListOrders(this.filterOrders);
  }

  onViewOrderDetail(order: OrderModel) {
    this.dialog.open(OrderDetailComponent, {data: {order}});
  }


  onUpdateStatusOrders() {
    const orders: OrderModel[] = [];
    this.selection.selected.forEach(element => {
      orders.push(element);
    });
    this.openDialogUpdateStatus(orders);
  }

  onChangeOrderStatus(order: OrderModel) {
    this.openDialogUpdateStatus([order]);
  }

  onRedirectOrder() {
    return this.router.navigateByUrl(`/order-product`);
  }

  onDownloadOrderPDF() {
    const listId = this.selection.selected.map((order) => order.id);
    let params = `["` + listId.join(`","`) + `"]`;
    const filter = {
      listId: params
    };
    const downloadFileSubscription = this.orderService.downloadOrderPdf(filter).subscribe((res) => {
      saveAs(res, `Đặt hàng ngày ${convertStrToYYMMdd(new Date())}.pdf`);
    });
    this.subscriptions.push(downloadFileSubscription);
  }

  private openDialogUpdateStatus(orders: OrderModel[]) {
    const dialogRef = this.dialog.open(UpdateOrdersStatusComponent, {
      data: {
        orders,
        title: `Cập nhập trạng thái đơn hàng`
      },
      width: '480px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.data) {
        this.loadListOrders(this.filterOrders);
      }
    });
  }

  private loadListOrders(filterOrders: {
    userId: string,
    statusId: string,
    fromDate: string,
    createdAt: string,
    toDate: string,
    _keyword: string,
    page: string,
    size: string
  }) {
    this.dataSource.loadOrders(filterOrders);
    const entitiesSubscription = this.dataSource.entitiesSubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.orders = res;
    });
    this.subscriptions.push(entitiesSubscription);
    this.selection.clear();
  }

  private subscribePaginator() {
    const paginatorSubscription = this.paginator.page.subscribe(($event) => {
      this.filterOrders.page = ($event.pageIndex + 1).toString();
      this.loadListOrders(this.filterOrders);
    });
    this.subscriptions.push(paginatorSubscription);
  }

  private subscribeSort() {
    const sortSubscription = this.sort.sortChange.subscribe(($event) => {
      if ($event.direction === 'desc') {
        this.filterOrders.createdAt = ESort.DESC;
      } else {
        this.filterOrders.createdAt = ESort.ASC;
      }
      this.paginator.pageIndex = 0;
      this.filterOrders.page = '1';
      this.loadListOrders(this.filterOrders);
    });
    this.subscriptions.push(sortSubscription);
  }

  private loadListStatus() {
    const statusSubscription = this.statusService.loadListStatus().subscribe((res: ResponseHttp<StatusModel[]>) => {
      this.listStatus = res.data;
    });
    this.subscriptions.push(statusSubscription);
  }

  private initialForm() {
    this.searchOrderFormGroup = this.formBuilder.group({
      status: [''],
      startDate: {
        value: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        disabled: true
      },
      endDate: {
        value: new Date(),
        disabled: true
      },
      keywords: ['']
    });
  }

  private loadCurrentRole() {
    this.authService.currentUser.subscribe((user: UserModel) => {
      if (user) {
        this.currentRole = user.role;
      }
    });
  }
}
