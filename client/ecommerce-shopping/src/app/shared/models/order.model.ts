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
