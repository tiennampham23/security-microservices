import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderDataSource} from '@drop-shipping/shared/data-sources/order.datasource';
import {OrderModel, UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {OrderService} from '@drop-shipping/shared/https/order.service';
import {StatusService} from '@drop-shipping/shared/https/status.service';
import {EStatusOrders, ListStatus} from '@drop-shipping/core/constants/app.constant';
import {convertStrToYYMMdd} from '@drop-shipping/core/utils/helper.utils';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {MatDialog} from '@angular/material/dialog';
import {UpdateOrdersStatusComponent} from '../update-orders-status/update-orders-status.component';
import {Router} from '@angular/router';
import {OrderDetailComponent} from "@drop-shipping/pages/order/components/order-detail/order-detail.component";
import {UserService} from "@drop-shipping/shared/https/user.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() portletClass: string;
  dataSource: OrderDataSource;
  orders: OrderModel[];
  listStatus: string[] = ListStatus;
  currentRole: number;
  displayedColumns = [
    'select',
    'ID',
    'userId',
    'createdDate',
    'phone',
    'totalPrice',
    'address',
    'status',
    'actions'
  ];
  filterOrders: {
    userId: string,
    status: string,
    fromDate: string,
    toDate: string,
    page: string,
    size: string
  } = {
    userId: null,
    status: null,
    fromDate: convertStrToYYMMdd(new Date(2018, 1, 1)),
    toDate: convertStrToYYMMdd(new Date()),
    page: '0',
    size: '20'
  };

  users: UserModel[];

  searchOrderFormGroup: FormGroup;

  selection = new SelectionModel<OrderModel>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private orderService: OrderService,
    private statusService: StatusService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.initialForm();
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
    this.dataSource = new OrderDataSource(this.orderService);
    this.loadListOrders(this.filterOrders);
    this.subscribePaginator();
    this.loadUsers();
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
    this.filterOrders.page = '0';
    this.filterOrders.size = '20';
    this.filterOrders.status = this.searchOrderFormGroup.controls.status.value;
    this.filterOrders.userId = this.searchOrderFormGroup.controls.userId.value;
    this.filterOrders.fromDate = convertStrToYYMMdd(this.searchOrderFormGroup.controls.fromDate.value);
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


  getUser(userId: number) {
    if (this.users) {
      let userName = null;
      this.users.forEach(user => {
        if (userId ===  user.id) {
          userName =  user.fullName;
        }
      });
      return userName;
    }
  }

  onChangeOrderStatus(order: OrderModel) {
    this.openDialogUpdateStatus([order]);
  }

  onRedirectOrder() {
    return this.router.navigateByUrl(`/order-product`);
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
    status: string,
    fromDate: string,
    toDate: string,
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

  private loadUsers() {
    const loadUsersSubscription = this.userService.loadUsers().subscribe((res: ResponseHttp<UserModel[]>) => {
      this.users = res.data;
    });
    this.subscriptions.push(loadUsersSubscription);
  }

  private subscribePaginator() {
    const paginatorSubscription = this.paginator.page.subscribe(($event) => {
      this.filterOrders.page = ($event.pageIndex + 1).toString();
      this.loadListOrders(this.filterOrders);
    });
    this.subscriptions.push(paginatorSubscription);
  }

  private initialForm() {
    this.searchOrderFormGroup = this.formBuilder.group({
      status: [''],
      fromDate: {
        value: new Date(2018,1,1),
        disabled: true
      },
      endDate: {
        value: new Date(),
        disabled: true
      },
      userId: ['']
    });
  }
}
