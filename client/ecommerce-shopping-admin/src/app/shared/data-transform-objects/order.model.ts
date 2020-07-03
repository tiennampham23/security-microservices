import {ProductModel} from './product.model';

export interface OrderModel {
  id: string;
  code: string;
  userId: string;
  username: string;
  statusName: string;
  createdAt: string;
  deliveryAgent: string;
  deliveryCode: string;
  totalValue: number;
}

export interface OrderDetailModel {
  id: string;
  deliveryAgent: string;
  deliveryCode: string;
  createdAt: string;
  status: string;
  username: string;
  listItem: ProductModel[];
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
