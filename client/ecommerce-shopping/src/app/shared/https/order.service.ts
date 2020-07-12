import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {mapToHttpParamsQuery} from "../../core/utils/helper.utils";

const router = {
  createOrders: `/orders/create`,
  getMyOrders: `/orders/get-my-orders`
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: BaseService
  ) { }

  createOrders(
    body: {
      listProducts: {
        productId: number,
        amount: number,
        totalPrice: number
      }[],
      address: string,
      phone: string
    }
  ) {
    return this.httpClient.post(router.createOrders, body);
  }

  loadMyOrders(
    filter: {
      page: number,
      size: number,
      status: string,
      fromDate: string,
      toDate: string
    }
  ) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.get(router.getMyOrders, params);
  }
}
