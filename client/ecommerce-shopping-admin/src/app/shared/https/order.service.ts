import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {fmt, mapFilterArrayToParams, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';
import {HttpParams} from '@angular/common/http';
import { CreateOrderModel } from '../data-transform-objects/public-api';

const router = {
  filterOrder: `/orders/page`,
  orderById: `/orders/getbyid/{orderId}`,
  orderDetail: `/orders/get-detail-by-id/{orderId}`,
  updateStatusOrders: `/orders/change-status`,
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
      status: string,
      fromDate: string,
      toDate: string,
      page: string,
      size: string
    }
  ) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.get(router.filterOrder, params);
  }

  loadOrderDetail(orderId: number) {
    const uri = fmt(router.orderDetail, { orderId });
    return this.httpClient.get(uri);
  }

  loadOrderById(orderId: number) {
    const uri = fmt(router.orderById, { orderId });
    return this.httpClient.get(uri);
  }

  updateStatusOrders(
    body: {
      status: string,
      listOrderId: number[]
    }
  ) {
    return this.httpClient.post(router.updateStatusOrders, body);
  }
}
