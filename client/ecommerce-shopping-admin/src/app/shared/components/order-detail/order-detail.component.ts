import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderDetailModel, OrderModel, ProductModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {Observable, Subject} from 'rxjs';
import {OrderService} from '@drop-shipping/shared/https/public-api';
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

  orderDetail: OrderDetailModel;

  displayedColumns = [
    'Tên sản phẩm',
    'Số lượng',
    'Giá',
    'Thành tiền'
  ];

  private unsubscribe: Subject<any> = new Subject<any>();
  dataSource: MatTableDataSource<ProductModel>;
  constructor(
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      order: OrderModel
    },
    private orderService: OrderService
  ) {
    if (this.data) {
      this.order = this.data.order;
    }
  }

  ngOnInit(): void {
    if (this.order) {
      this.loadOrderDetail(this.order.id);
    }
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
    if (this.orderDetail) {
      let total = 0;
      this.orderDetail.listItem.forEach((item) => {
        total += item.price * item.number;
      });
      return total;
    }
  }

  private loadOrderDetail(id: string) {
    const orderDetail$ = this.orderService.loadOrderDetail(id).pipe(takeUntil(this.unsubscribe)) as Observable<OrderDetailModel>;
    orderDetail$.subscribe((orderDetail) => {
      this.orderDetail = orderDetail;
    })
  }
}
