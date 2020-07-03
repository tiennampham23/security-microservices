import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {HttpExtensionModel, QueryParamsModel, QueryResultsModel} from '../models/public-api';
interface BaseModel {
  id: string;
}
export class BaseDataSource implements DataSource<BaseModel> {
  entitiesSubject = new BehaviorSubject<any[]>([]);
  hasItems = true; // Need to show message: 'No records found'

  loading$ = new BehaviorSubject<boolean>(false);
  isPreloadTextViewed$: Observable<boolean> = of(true);

  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;

  private subscriptions: Subscription[] = [];
  constructor() {
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();

    // subscribe hasItem to length of entitySubject equal 0
    const hasItemsSubscription = this.paginatorTotal$.pipe(
      distinctUntilChanged(),
      skip(1)
    ).subscribe((res) => {
      this.hasItems = res > 0;
    });
    this.subscriptions.push(hasItemsSubscription);
  }
  connect(collectionViewer: CollectionViewer): Observable<BaseModel[] | ReadonlyArray<BaseModel>> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.paginatorTotalSubject.complete();
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  baseFilter(entities: any[], queryParams: QueryParamsModel, filtrationFields: string[] = []): QueryResultsModel {
    const httpExtension = new HttpExtensionModel();
    return httpExtension.baseFilter(entities, queryParams, filtrationFields);
  }

  sortArray(incomingArray: any[], sortField: string = '', sortOrder: string = 'asc'): any[] {
    const httpExtension = new HttpExtensionModel();
    return httpExtension.sortArray(incomingArray, sortField, sortOrder);
  }

  searchInArray(incomingArray: any[], queryObj: any, filtrationFields: string[] = []): any[] {
    const httpExtension = new HttpExtensionModel();
    return httpExtension.searchInArray(incomingArray, queryObj, filtrationFields);
  }
}
