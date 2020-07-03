import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserDataSource} from '@drop-shipping/shared/data-sources/public-api';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SubHeaderService} from '@drop-shipping/shared/services/sub-header.service';
import {UserService} from '@drop-shipping/shared/https/public-api';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddSubBalanceComponent} from '../../components/add-sub-balance/add-sub-balance.component';
import {UserBusinessComponent} from '../../components/user-business/user-business.component';
import {ChangeStatusComponent} from '../../components/change-status/change-status.component';
import {ChangePasswordUserComponent} from '../../components/change-password-user/change-password-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
  dataSource: UserDataSource;

  users: UserModel[] = [];
  selection = new SelectionModel<UserModel>(true, []);

  displayedColumns = [
    'select',
    'name',
    'email',
    'phone',
    'balance',
    'totalUsage',
    'expiredDate',
    'status',
    'actions'
  ];

  filterSearchUsers: {
    page: number,
    size: number,
    _keyword: string,
    sort: number,
    propertySort: string
  } = {
    page: 0,
    size: 0,
    _keyword: null,
    sort: -1,
    propertySort: null
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private subheaderService: SubHeaderService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
  ) {
    this.filterSearchUsers.page = 1;
    this.filterSearchUsers.size = 10;
    this.filterSearchUsers.sort = -1;
    this.filterSearchUsers.propertySort = 'balance';
  }

  ngOnInit(): void {
    this.subheaderService.setTitle('Danh sách người dùng cấp 2');
    this.dataSource = new UserDataSource(this.userService);
    this.loadChildUsers(this.filterSearchUsers);
    this.subscribePaginator();
    this.subscribeSearchKeyword();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  addChildUser() {
    const dialogRef = this.dialog.open(UserBusinessComponent, {data: {user: null, type: 'CREATE'}});
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.loadChildUsers(this.filterSearchUsers);
    });
  }

  updateInformationUser(user: UserModel) {
    const dialogRef = this.dialog.open(UserBusinessComponent, {data: {user, type: 'UPDATE'}});
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.loadChildUsers(this.filterSearchUsers);
    });
  }

  loadCustomersList() {

  }

  deleteCustomers() {

  }

  fetchCustomers() {

  }

  updateStatusForCustomers() {

  }

  masterToggle() {
    return null;
  }

  isAllSelected() {
    return false;
  }

  getItemCssClassByStatus(status: number = 1) {
    switch (status) {
      case 0:
        return 'danger';
      case 1:
        return 'success';
      case 2:
        return 'metal';
    }
    return '';
  }

  getItemStatusString(status: number = 1) {
    switch (status) {
      case 0:
        return 'Bị khoá';
      case 1:
        return 'Hoạt động';
    }
    return '';
  }

  changeUserStatus(user: UserModel, status: string) {
    const title = status === 'BLOCK' ? `Khóa tài khoản ${user.name}` : `Mở tài khoản ${user.name}`;
    const description = status === 'BLOCK' ? `Bạn có muốn khóa tài khoản ${user.name} không?` : `Bạn có muốn mở tài khoản ${user.name} không?`;
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      data: {title, description, status, user},
      width: '440px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res?.status) {
        this.loadChildUsers(this.filterSearchUsers);
      }
    });
  }

  changeBalanceChildUser(user: UserModel, type: string) {
    const dialogRef = this.dialog.open(AddSubBalanceComponent, {data: {user, type}});
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.loadChildUsers(this.filterSearchUsers);
    });
  }


  changePasswordChildUser(user: UserModel) {
    const dialogRef = this.dialog.open(ChangePasswordUserComponent, {data: {user}});
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.loadChildUsers(this.filterSearchUsers);
    });
  }

  goToUserOrders(user: UserModel) {
    return this.router.navigateByUrl(`/user/${user.id}/orders`).then();
  }

  goToUserTransactions(user: UserModel) {
    return this.router.navigateByUrl(`/user/${user.id}/transactions`).then();
  }

  private loadChildUsers(
    filterSearchUsers: {
      page: number;
      size: number;
      _keyword: string;
      sort: number;
      propertySort: string
    }) {
    this.dataSource.loadChildUsers(filterSearchUsers);
    const entitiesSubscription = this.dataSource.entitiesSubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.users = res;
    });
    this.subscriptions.push(entitiesSubscription);
    this.selection.clear();
  }

  private subscribePaginator() {

  }

  private subscribeSearchKeyword() {
  }
}
