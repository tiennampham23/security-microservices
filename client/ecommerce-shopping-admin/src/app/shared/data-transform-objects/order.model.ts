import {ProductModel} from './product.model';

export interface OrderModel {
  id: number;
  userId: number;
  totalPrice: number;
  createdDate: string;
  address: string;
  phone: string;
  status: string;
}

export interface OrderDetailModel {
  id: number,
  orderId: number,
  productId: number,
  totalPrice: number,
  amount: number
}

export interface CreateOrderModel {
  code: string;
  deliveryAgent: string;
  deliveryCode: string;
  items: {itemModalId: string;
    itemId: string;
    number: number
  }[];
}
