import { Injectable } from '@angular/core';
import {BaseService} from "@drop-shipping/shared/https/base.service";
import {HttpParams} from "@angular/common/http";

const router = {
  usage: `/reports/usage`,
  report: `/reports/orders`,
  charge: `/reports/charge`,
};
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadUsage(filter: {
    fromDate: string,
    toDate: string
  }) {
    let params = new HttpParams();
    if (filter.fromDate) {
      params = params.set(`filters[fromDate]`, filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set(`filters[toDate]`, filter.toDate);
    }

    return this.httpClient.get(router.usage, params);
  }

  loadOrderByFilter(filter: {
    fromDate: string,
    toDate: string,
    statusId: string
  }) {
    let params = new HttpParams();
    if (filter.fromDate) {
      params = params.set(`filters[fromDate]`, filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set(`filters[toDate]`, filter.toDate);
    }
    if (filter.statusId) {
      params = params.set(`filters[statusId]`, filter.statusId);
    }

    return this.httpClient.get(router.report, params);
  }

  loadChargeByFilter(filter: {
    fromDate: string,
    toDate: string,
  }) {
    let params = new HttpParams();
    if (filter.fromDate) {
      params = params.set(`filters[fromDate]`, filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set(`filters[toDate]`, filter.toDate);
    }

    return this.httpClient.get(router.charge, params);
  }
}
