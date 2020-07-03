export interface ProductModel {
  id: string;
  name: string;
  avatar: string;
  price: number;
  totalNumber: number;
  number?: number;
}

export interface ProductDetailModel {
  id: string;
  itemName: string;
  avatar: string;
  weight: string;
  height: string;
  width: string;
  code: string;
  totalNumber: number;
  description: string;
  shippingFee: number;
  inventoryValue: number;
  imageLink: string;
  otherLink: string;
  itemModalId: string;
  categoryId: number;
  categoryName: string;
  properties: {
    propertyName: string;
    propertyId: string;
    value: string[]
  }[];
  itemModal: SubProduct[];
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
