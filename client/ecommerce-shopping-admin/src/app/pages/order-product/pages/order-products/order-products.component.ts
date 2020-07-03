import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {Delivery} from '@drop-shipping/core/constants/app.constant';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {ProductService} from '@drop-shipping/shared/https/product.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {ProductModel, SelectSubProduct, SubProduct} from '@drop-shipping/shared/data-transform-objects/public-api';
import {MatSelectChange} from '@angular/material/select';
import {OrderService} from '@drop-shipping/shared/https/order.service';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';

const logger = new Logger('OrderProductsComponent');

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit, OnDestroy {
  orderProductsFormGroup: FormGroup;
  ordersFormArray: FormArray;
  loading$: Observable<boolean> = of(false);
  data = {
    orders: []
  };
  products: ProductModel[];

  selectedSubProduct: SubProduct;

  selectProduct: ProductModel;

  subProducts = [];

  totalPrices = [];

  totalInventory = [];

  filterProducts: {
    page?: number,
    size?: number,
    _keyword?: string
  } = {
    page: null,
    size: null,
    _keyword: null
  };

  listDelivery = Delivery;

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private snackbarService: SnackbarService
  ) {
    this.initialForms();
  }

  ngOnInit(): void {
    this.ordersFormArray = this.orderProductsFormGroup.get('orders') as FormArray;
    this.loadProducts(this.filterProducts);
    this.setOrdersFormArray();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  setOrdersFormArray() {
    const controls = this.ordersFormArray;
    this.data.orders.forEach(order => {
      controls.push(this.formBuilder.group({
        code: order.code,
        deliveryAgent: order.deliveryAgent,
        deliveryCode: order.deliveryCode,
        items: this.setOrderItems(order)
      }));
    });
  }

  getComponentTitle() {

  }

  onSaveProduct() {
    const {orders} = this.orderProductsFormGroup.value;
    const createProducts$ = this.orderService.createOrders(orders)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError((err) => {
          logger.debug(err);
          return of(null);
        })
      );
    createProducts$.subscribe((res) => {
      this.snackbarService.showSuccess(`Tạo order thành công`);
    }, (err) => {
      logger.debug(err);
      this.snackbarService.showError(`Tạo order thất bại`);
    });
  }

  removeClassifyGroup(i: number) {

  }

  addClassifyValue(control: any, i: number) {
    control.push(
      this.formBuilder.group({
        itemModalId: [''],
        itemId: [''],
        number: [1],
      })
    );
    if (this.subProducts[i]) {
      this.subProducts[i].push([]);
    }
    if (this.totalPrices[i]) {
      this.totalPrices[i].push(0);
    }

    if (this.totalInventory[i]) {
      this.totalInventory[i].push([]);
    }
  }

  removeClassifyValue(control: any, j: number, i: number) {

  }

  addClassifyGroup() {
    const controls = this.ordersFormArray;
    controls.push(this.formBuilder.group({
      code: [''],
      deliveryAgent: [''],
      deliveryCode: [''],
      items: this.formBuilder.array([])
    }));

    this.subProducts.push([]);

    this.totalPrices.push([]);

    this.totalInventory.push([]);
  }

  loadProducts(queryParams?: {
    page?: number,
    size?: number,
    _keyword?: string
  }) {
    const products$ = this.productService.loadProducts(queryParams)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError((err) => {
          logger.debug(err);
          return of(null);
        })
      );
    products$.subscribe((res: ResponseHttp<ProductModel[]>) => {
      this.products = res.data;
    });
  }

  onChangeProduct($event: MatSelectChange, i: number, j: number) {
    this.products.forEach(product => {
      if (product.id === $event.value) {
        this.selectProduct = product;
      }
    });
    const subProducts$ = this.productService.loadSubProductById($event.value)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError((err) => {
          logger.debug(err);
          return of(null);
        })
      );
    subProducts$.subscribe((res: SelectSubProduct[]) => {
      this.subProducts[i][j] = [...res];
    });
  }

  private initialForms() {
    this.orderProductsFormGroup = this.formBuilder.group({
      orders: this.formBuilder.array([])
    });
  }

  private setOrderItems(order) {
    const arr = new FormArray([]);
    order.items.forEach((item) => {
      arr.push(this.formBuilder.group({
        itemModalId: item.itemModalId,
        itemId: item.itemId,
        number: item.number,
      }));
    });
  }

  onChooseProduct($event: MatSelectChange, i: number, j: number) {
    const subProduct =  this.subProducts[i][j];
    const selectedProduct = subProduct.filter((product) => {
      return product.id === $event.value;
    });
    logger.debug(selectedProduct);
    if (selectedProduct) {
      this.selectedSubProduct = selectedProduct;
      this.totalPrices[i][j] = selectedProduct[0].price;
      this.totalInventory[i][j] = selectedProduct[0].inventoryValue;
    }
    logger.debug(this.totalInventory);
  }

  onChangeAmountProduct($event, i: number, j: number) {
    this.totalPrices[i][j] = this.selectedSubProduct[0].price * $event.target.value;
    logger.debug(this.totalPrices);
  }

  getAmountSubProduct(i: number, j: number) {
    const subProduct = this.subProducts[i][j];
    const {orders} = this.orderProductsFormGroup.value;
    if (subProduct) {
      subProduct.forEach(product => {
        if (product.id === orders[i].items[j].itemModalId) {
          return product.inventoryValue;
        }
      });
    }
  }
}
