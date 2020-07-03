import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponseHttp, TransactionTypeModel, UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {TransactionService, UserService} from '@drop-shipping/shared/https/public-api';
import {Subscription} from 'rxjs';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
const logger = new Logger('AddSubBalanceComponent');
@Component({
  selector: 'app-add-sub-balance',
  templateUrl: './add-sub-balance.component.html',
  styleUrls: ['./add-sub-balance.component.scss']
})
export class AddSubBalanceComponent implements OnInit, OnDestroy {
  hasFormErrors = false;
  viewLoading = false;
  balanceFormGroup: FormGroup;
  user: UserModel;
  type: string;
  transactionTypes: TransactionTypeModel[];

  private subscriptions: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddSubBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: UserModel,
      type: string;
    },
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.user = this.data.user;
    this.type = this.data.type;
    this.initialForm();
  }

  ngOnInit(): void {
    this.loadTransactionTypes();
    this.setValuesForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.balanceFormGroup.controls;
    if (this.balanceFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }
    this.onChangeBalanceUser();
  }

  getTitle() {
    if (this.type === 'ADD') {
      return `Cộng tiền tài khoản ${this.user?.name}`;
    } else if (this.type === 'SUB') {
      return `Trừ tiền tài khoản ${this.user?.name}`;
    }
  }

  onAlertClose($event: boolean) {

  }

  private initialForm() {
    this.balanceFormGroup = this.fb.group({
      value: [0, [Validators.required]],
      note: ['', [Validators.required]],
      transactionType: [0, [Validators.required]]
    });
  }

  private loadTransactionTypes() {
    const transactionTypes$ = this.transactionService.loadTransactionTypes().subscribe((res: ResponseHttp<TransactionTypeModel[]>) => {
      this.transactionTypes = res.data;
    });
    this.subscriptions.push(transactionTypes$);
  }

  private setValuesForm() {
    this.balanceFormGroup.patchValue({
      note: this.type === 'ADD' ? `Cộng tiền cho tài khoản từ người dùng cấp 1` : `Trừ tiền tài khoản từ người dùng cấp 1`
    });
  }

  private onChangeBalanceUser() {
    const changeBalance = {
      value: this.type === 'ADD' ? this.balanceFormGroup.controls.value.value : -(this.balanceFormGroup.controls.value.value) ,
      note: this.balanceFormGroup.controls.note.value,
      transactionType: this.balanceFormGroup.controls.transactionType.value,
    };
    logger.debug(changeBalance);
    const changeBalanceSubscription = this.userService.changeBalanceUser(this.user.id, changeBalance)
      .subscribe((res) => {
        if (res) {
          const message = this.type === 'ADD' ? `Cộng tiền cho tài khoản ${this.user.name} thành công` : `Trừ tiền tài khoản ${this.user.name} thành công`;
          this.snackbarService.showSuccess(message);
          this.dialogRef.close({
            status: true
          });
        }
      }, (error => {
        const message = this.type === 'ADD' ? `Cộng tiền cho tài khoản ${this.user.name} thất bại` : `Trừ tiền tài khoản ${this.user.name} thất bại`;
        this.snackbarService.showError(message);
        this.dialogRef.close({
          status: false
        });
        logger.debug(error);
      }));
    this.subscriptions.push(changeBalanceSubscription);
  }
}
