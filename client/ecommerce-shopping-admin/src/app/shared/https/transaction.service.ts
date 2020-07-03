import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpParams} from '@angular/common/http';

const router = {
  getTransactionTypes: `/transactions/types`,
  getTransactions: `/transactions`
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadTransactions(
    filterSearch: {
      page: number,
      size: number,
      userId: string,
      fromDate: string,
      toDate: string,
      createdAt: string,
      typeId: number
    }
  ) {
    let params = new HttpParams();
    if (filterSearch.userId) {
      params = params.set(`userId`, filterSearch.userId);
    }
    if (filterSearch.fromDate) {
      params = params.set(`filters[fromDate]`, filterSearch.fromDate);
    }
    if (filterSearch.toDate) {
      params = params.set(`filters[toDate]`, filterSearch.toDate);
    }
    if (filterSearch.createdAt) {
      params = params.set(`sorts[createdAt]`, filterSearch.createdAt);
    }
    if (filterSearch.typeId) {
      params = params.set(`filters[typeId]`, filterSearch.typeId.toString());
    }
    if (filterSearch.page) {
      params = params.set(`page`, filterSearch.page.toString());
    }
    if (filterSearch.size) {
      params = params.set(`size`, filterSearch.size.toString());
    }
    return this.httpClient.get(router.getTransactions, params);
  }

  loadTransactionTypes() {
    return this.httpClient.get(router.getTransactionTypes);
  }
}
