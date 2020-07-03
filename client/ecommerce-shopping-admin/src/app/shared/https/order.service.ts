import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {fmt, mapFilterArrayToParams, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';
import {HttpParams} from '@angular/common/http';
import { CreateOrderModel } from '../data-transform-objects/public-api';

const router = {
  filterOrder: `/orders/`,
  orderDetail: `/orders/{orderId}`,
  updateStatusOrders: `/orders/status`,
  createOrders: `/orders/`,
  downloadPDF: `/orders/pdf`
};
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadOrders(
    filter: {
      userId: string,
      statusId: string,
      fromDate: string,
      createdAt: string,
      toDate: string,
      _keyword: string,
      page: string,
      size: string
    }
  ) {
    let params = new HttpParams();
    if (filter.userId) {
      params = params.set(`filters[userId]`, filter.userId);
    }
    if (filter.statusId) {
      params = params.set(`filters[statusId]`, filter.statusId);
    }
    if (filter.fromDate) {
      params = params.set(`filters[fromDate]`, filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set(`filters[toDate]`, filter.toDate);
    }
    if (filter.createdAt) {
      params = params.set(`sorts[createdAt]`, filter.createdAt);
    }
    if (filter._keyword) {
      params = params.set(`_keyword`, filter._keyword);
    }
    if (filter.page) {
      params = params.set(`page`, filter.page);
    }
    if (filter.size) {
      params = params.set(`size`, filter.size);
    }
    return this.httpClient.get(router.filterOrder, params);
  }

  loadOrderDetail(orderId: string) {
    const uri = fmt(router.orderDetail, { orderId });
    return this.httpClient.get(uri);
  }

  updateStatusOrders(
    body: {
      statusId: number,
      description: string,
      orderId: string[]
    }
  ) {
    return this.httpClient.put(router.updateStatusOrders, body);
  }

  createOrders(
    orders: CreateOrderModel[]
  ) {
    return this.httpClient.post(router.createOrders, orders);
  }

  downloadOrderPdf(
    filter: {
      listId: string
    }
  ) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.getDownLoadFile(router.downloadPDF, params);
  }
}
