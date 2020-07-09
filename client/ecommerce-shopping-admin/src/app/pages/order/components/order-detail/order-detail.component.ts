import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  OrderDetailModel,
  OrderModel,
  ProductModel,
  ResponseHttp, UserModel
} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {Subject} from 'rxjs';
import {OrderService, ProductService, UserService} from '@drop-shipping/shared/https/public-api';
import {takeUntil} from 'rxjs/operators';
import {EStatusOrders} from '@drop-shipping/core/constants/app.constant';
import {MatTableDataSource} from '@angular/material/table';


const logger = new Logger('OrderDetailComponent');

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  viewLoading = true;
  order: OrderModel;

  orderDetails: OrderDetailModel[];

  currentOrder: OrderModel;

  users: UserModel[];
  products: ProductModel[];

  displayedColumns = [
    'Tên sản phẩm',
    'Số lượng',
    'Giá',
    'Thành tiền'
  ];
  dataSource: MatTableDataSource<ProductModel>;
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      order: OrderModel
    },
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) {
    if (this.data) {
      this.order = this.data.order;
    }
  }

  ngOnInit(): void {
    if (this.order) {
      this.loadOrderDetail(this.order.id);
      this.loadOrderById(this.order.id);
    }

    this.loadUsers();
    this.loadProducts();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getTitle() {
    return `Chi tiết đặt hàng`;
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

  calculateTotal() {
    if (this.orderDetails) {
      let total = 0;
      this.orderDetails.forEach((item) => {
        total += item.totalPrice;
      });
      return total;
    }
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

  getProduct(productId: number) {
    if (this.products) {
      let productName = null;
      this.products.forEach(product => {
        if (productId ===  product.id) {
          productName =  product.productName;
        }
      });
      return productName;
    }
  }

  private loadUsers() {
    this.userService.loadUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: ResponseHttp<UserModel[]>) => {
      this.users = res.data;
    });
  }

  private loadProducts() {
    this.productService.loadAllProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: ResponseHttp<ProductModel[]>) => {
        this.products = res.data;
      });
  }

  private loadOrderDetail(id: number) {
    const orderDetail$ = this.orderService.loadOrderDetail(id).pipe(takeUntil(this.unsubscribe));
    orderDetail$.subscribe((res: ResponseHttp<OrderDetailModel[]>) => {
      this.orderDetails = res.data;
    });
  }

  private loadOrderById(id: number) {
    const order$ = this.orderService.loadOrderById(id).pipe(takeUntil(this.unsubscribe));
    order$.subscribe((res: ResponseHttp<OrderModel>) => {
      this.currentOrder = res.data;
    })
  }
}
