import {ProductModel} from "./product.model";
export class CartModel {
  items: ProductModel[];
  totalItems: number;

  constructor() {
    this.items = [];
    this.totalItems = 0;
  }

  public updateFrom(src: CartModel) {
    this.items = src.items;
    this.totalItems = src.totalItems;
  }
}
