import {Injectable} from '@angular/core';
import {CartModel} from "../models/cart.model";
import {Observable, Observer} from "rxjs";
import {ProductModel, ResponseHttp} from "../models/public-api";
import {ProductService} from "../https/product.service";

const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private subscriptionObservable: Observable<CartModel>;
  private subscribers: Array<Observer<CartModel>> = new Array<Observer<CartModel>>();
  private products: ProductModel[];

  public get(): Observable<CartModel> {
    return this.subscriptionObservable;
  }

  constructor(
    private _productService: ProductService
  ) {
    this.subscriptionObservable = new Observable<CartModel>((observer: Observer<CartModel>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });

    this._productService.loadAllProducts().subscribe((res: ResponseHttp<ProductModel[]>) => this.products = res.data);
  }


  public addItem(product: ProductModel, amount: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.id === product.id);
    if (item === undefined) {
      const obj: ProductModel = {
        id: product.id,
        price: product.price,
        amount: amount,
        thumbnail: product.thumbnail,
        description: product.description,
        categoryId: product.categoryId,
        supplierId: product.supplierId,
        productName: product.productName
      };
      cart.items.push(obj);
    } else {
      item.amount += amount;
      cart.items = cart.items.filter((cartItem) => cartItem.amount > 0);
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new CartModel();
    this.save(newCart);
    this.dispatch(newCart);
  }

  private calculateCart(cart: CartModel): void {
    // cart.totalItems = cart.items
    //                       .map((item) => item.quantity * this.products.find((p) => p.laptopId === item.laptopId).price)
    //                       .reduce((previous, current) => previous + current, 0);
    cart.totalItems = cart.items.length;
  }

  private retrieve(): CartModel {
    const cart = new CartModel();
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: CartModel): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: CartModel): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }
}
