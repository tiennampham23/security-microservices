import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderModel, StatusModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService, StatusService} from '@drop-shipping/shared/https/public-api';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EStatusOrders, ListStatus} from '@drop-shipping/core/constants/app.constant';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {MatSelectChange} from "@angular/material/select";
import {Logger} from "@drop-shipping/core/logger/public-api";

const logger = new Logger('UpdateOrdersStatusComponent');
@Component({
  selector: 'app-update-orders-status',
  templateUrl: './update-orders-status.component.html',
  styleUrls: ['./update-orders-status.component.scss']
})
export class UpdateOrdersStatusComponent implements OnInit, OnDestroy {
  orders: OrderModel[];
  selectedStatusForUpdate = new FormControl('');
  updateOrderFormGroup: FormGroup;
  viewLoading = false;
  loadingAfterSubmit = false;

  statusOrders = ListStatus;

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<UpdateOrdersStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      orders: OrderModel[],
      title: string
    },
    private formBuilder: FormBuilder,
    private orderStatusService: StatusService,
    private orderService: OrderService,
    private snackbarService: SnackbarService
  ) {

    if (this.data) {
      this.orders = this.data.orders;
    }
    this.initialForm();
  }

  private get orderFormGroupValue() {
    return this.updateOrderFormGroup.value;
  }

  ngOnInit(): void {
    this.viewLoading = true;
    setTimeout(() => {
      this.viewLoading = false;
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

  updateStatus() {
    this.viewLoading = true;
    this.loadingAfterSubmit = true;
    const ids = [];
    this.orders.forEach(order => {
      ids.push(order.id);
    });
    const updateStatus$ = this.orderService.updateStatusOrders({
      status: this.orderFormGroupValue.selectedStatusForUpdate,
      listOrderId: [...ids]
    }).pipe(takeUntil(this.unsubscribe));
    updateStatus$.subscribe(() => {
      setTimeout(() => {
        this.snackbarService.showSuccess(`Cập nhập trạng thái đơn hàng thành công`);
        this.dialogRef.close({
          data: true
        });
      }, 1000);
    }, (res) => {
      this.viewLoading = false;
      this.loadingAfterSubmit = false;
      this.snackbarService.showError(`Cập nhập trạng thái đơn hàng thất bại`);
    });
  }

  onNoClick() {
    this.dialogRef.close({
      data: false
    });
  }

  onChangeStatus($event: MatSelectChange) {
    if ($event.value === 7) {

    }
  }

  private initialForm() {
    this.updateOrderFormGroup = this.formBuilder.group({
      selectedStatusForUpdate: ['', Validators.required]
    });
  }
}
