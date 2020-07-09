export interface ProductModel {
  id: number;
  productName: string;
  description: string;
  thumbnail: string;
  price: number;
  amount: number;
  categoryId: number;
  supplierId: number;
}

export interface SubProduct {
  id: string;
  code: string;
  inventoryValue: number;
  price: number;
  property: {
    id: string;
    value: string;
    name: string;
  }[];
}

export interface OrderProduct {
  itemModalId: string;
  itemId: string;
  number: number;
}

export interface SelectSubProduct {
  id: string;
  itemParentId: string;
  code: string;
  inventoryValue: number;
  price: number;
  name: string;
}
