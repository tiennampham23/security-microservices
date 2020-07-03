import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from '@drop-shipping/shared/https/public-api';
import {TransactionModel} from '@drop-shipping/shared/data-transform-objects/transaction.model';
import {TransactionTypeModel} from '@drop-shipping/shared/data-transform-objects/transaction-type.model';
import {TransactionDataSource} from '@drop-shipping/shared/data-sources/transaction.datasource';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {convertStrToYYMMdd} from '@drop-shipping/core/utils/helper.utils';
import {ESort} from '@drop-shipping/core/constants/app.constant';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId: string;
  transactions: TransactionModel[];
  transactionTypes: TransactionTypeModel[];
  dataSource: TransactionDataSource;

  searchTransactionFormGroup: FormGroup;

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

  displayedColumns = [
    'select',
    'id',
    'name',
    'valueBefore',
    'value',
    'valueAfter',
    'createdAt',
    'note',
    'actions'
  ];

  selection = new SelectionModel<TransactionModel>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
  ) {
    this.initialForm();
  }

  ngOnChanges() {
    if (this.userId) {
      this.filterTransactions.userId = this.userId;
    }
  }

  ngOnInit(): void {
    this.dataSource = new TransactionDataSource(this.transactionService);
    this.loadListTransactions(this.filterTransactions);
    this.loadTransactionTypes();
    this.subscribePaginator();
    this.subscribeSort();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  masterToggle() {
    return null;
  }

  isAllSelected() {
    return false;
  }


  onSearchTransactions() {
    this.filterTransactions.typeId
      = this.searchTransactionFormGroup.controls.typeId.value !== -1 ? this.searchTransactionFormGroup.controls.typeId.value : null;
    this.filterTransactions.fromDate = convertStrToYYMMdd(this.searchTransactionFormGroup.controls.fromDate.value);
    this.filterTransactions.toDate = convertStrToYYMMdd(this.searchTransactionFormGroup.controls.toDate.value);

    this.loadListTransactions(this.filterTransactions);
  }

  private initialForm() {
    this.searchTransactionFormGroup = this.formBuilder.group({
      fromDate: {
        value: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        disabled: true
      },
      toDate: {
        value: new Date(),
        disabled: true
      },
      typeId: [-1]
    });
  }

  private loadListTransactions(
    filterTransactions: {
      page: number;
      size: number;
      userId: string;
      fromDate: string;
      toDate: string;
      createdAt: string;
      typeId: number
    }) {
    this.dataSource.loadTransactions(filterTransactions);
    const entitiesSubscription = this.dataSource.entitiesSubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.transactions = res;
    });
    this.subscriptions.push(entitiesSubscription);
    this.selection.clear();
  }

  private loadTransactionTypes() {
    const transactionTypesSubscription = this.transactionService.loadTransactionTypes()
      .subscribe((res: ResponseHttp<TransactionTypeModel[]>) => {
        this.transactionTypes = res.data;
      });
    this.subscriptions.push(transactionTypesSubscription);
  }

  private subscribePaginator() {
    const paginatorSubscription = this.paginator.page.subscribe(($event) => {
      this.filterTransactions.page = $event.pageIndex + 1;
      this.loadListTransactions(this.filterTransactions);
    });
    this.subscriptions.push(paginatorSubscription);
  }

  private subscribeSort() {
    const sortSubscription = this.sort.sortChange.subscribe(($event) => {
      if ($event.direction === 'desc') {
        this.filterTransactions.createdAt = ESort.DESC;
      } else {
        this.filterTransactions.createdAt = ESort.ASC;
      }
      this.paginator.pageIndex = 0;
      this.filterTransactions.page = 1;
      this.loadListTransactions(this.filterTransactions);
    });
    this.subscriptions.push(sortSubscription);
  }
}
