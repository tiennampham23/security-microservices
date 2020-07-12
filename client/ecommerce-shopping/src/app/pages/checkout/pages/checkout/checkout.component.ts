import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartModel} from "../../../../shared/models/cart.model";
import {ProductModel, ResponseHttp} from "../../../../shared/models/public-api";
import { UserModel } from 'src/app/shared/dtos/public-api';
import {CartService} from "../../../../shared/singleton-services/cart.service";
import {ProductService} from "../../../../shared/https/product.service";
import {OrderService} from "../../../../shared/https/order.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/https/user.service";
import {takeUntil} from "rxjs/operators";
import {SnackbarService} from "../../../../shared/components/snackbar/snackbar.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  customerFormGroup: FormGroup;

  public cartObs: Observable<CartModel>;

  cart: CartModel;

  currentUser: string;

  products: ProductModel[];

  private destroyed$ = new Subject();

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.initialForms();
  }

  ngOnInit() {
    this.cartObs = this.cartService.get();
    this.cartObs.subscribe((result) => {
      this.cart = result;
      if (this.cart.totalItems > 0) {
        this.getListProductsInCart(this.cart);
      }
    });

    this.getCurrentUser();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getCurrentUser() {
    if (localStorage.getItem('current_user')) {
      this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    }
  }

  getListProductsInCart(cart: CartModel) {
    let ids = [];
    cart.items.map((item) => {
      ids.push(item.id);
    });
    this. products = cart.items;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cart.items.forEach((item) => {
      totalPrice = totalPrice + item.price * item.amount
    });

    return totalPrice;
  }

  changeValue($event, product: ProductModel) {
    const updatedProduct = this.products.filter((item) => item.id === product.id)[0];
    const amount = $event.target.value - updatedProduct.amount;
    this.cartService.addItem(updatedProduct, amount);
  }

  checkout() {
    const listProducts = [];
    console.log(this.products)
    this.products.forEach(product => {
      listProducts.push({
        productId: product.id,
        amount: product.amount,
        totalPrice: product.price * product.amount
      })
    })
    const data = {
      listProducts: [...listProducts],
      address: this.customerFormGroup.value.address,
      phone: this.customerFormGroup.value.phone,
    }
    console.log(data);
    // this.orderService.createOrder(data)
    //   .subscribe((res: ResponseModel<number>) => {
    //     if (res.code === 200) {
    //       this._notificationService.showSuccess('Đặt hàng thành công', 'Thành công', 3000);
    //       this.cartService.empty();
    //     }
    //   });
    const createOrders$ = this.orderService.createOrders(data).pipe(
      takeUntil(this.destroyed$)
    );
    createOrders$.subscribe((res: ResponseHttp<number>) => {
      this.snackbarService.showSuccess('Đặt hàng thành công');
      this.products = [];
      this.cartService.empty();
    });
  }

  getTotalItems() {
    return this.cart.totalItems;
  }

  private initialForms() {
    this.customerFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }
}
