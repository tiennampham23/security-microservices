// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {of, Subject} from 'rxjs';
// import {OrderProduct, ProductDetailModel, ResponseHttp, SubProduct} from '@drop-shipping/shared/data-transform-objects/public-api';
// import {takeUntil} from 'rxjs/operators';
// import {ProductService} from '@drop-shipping/shared/https/product.service';
// import {ActivatedRoute, Router} from '@angular/router';
// import {Logger} from '@drop-shipping/core/logger/logger.service';
// import {MatDialog} from '@angular/material/dialog';
// import {OrderProductsComponent} from '@drop-shipping/shared/components/order-products/order-products.component';
// import {FormControl} from '@angular/forms';
//
// const logger = new Logger('ProductDetailComponent');
//
// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.scss']
// })
// export class ProductDetailComponent implements OnInit, OnDestroy {
//   viewLoading = of(true);
//   isSelectedAllProps = true;
//   totalItems = 0;
//   currentPrice = 0;
//   orderProducts: OrderProduct;
//   subProduct: SubProduct;
//   selectedCondition: {
//     value: string,
//     name: string
//   }[] = [];
//   isSelectedHighlight = [];
//   productDetail: ProductDetailModel;
//   imagesLink: string[];
//   othersLink: string[];
//   productId: string;
//   amountProduct = new FormControl(1);
//   private unsubscribe: Subject<any> = new Subject<any>();
//
//   constructor(
//     private productService: ProductService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private dialog: MatDialog
//   ) {
//     this.activatedRoute.params.subscribe(params => {
//       console.log(params);
//       if (this.productId !== params.id) {
//         this.productId = params.id;
//         this.loadProductDetail(this.productId);
//       }
//     });
//   }
//
//   ngOnInit(): void {
//   }
//
//   ngOnDestroy() {
//     this.unsubscribe.next();
//     this.unsubscribe.complete();
//   }
//
//
//   onGoToUrl(url: string) {
//     return window.open(url, '_blank');
//   }
//
//   onChooseProperty(property: { propertyName: string; propertyId: string; value: string[] }, value: string, i: number, j: number) {
//     const index = this.selectedCondition.findIndex((item) => {
//       return item.name === property.propertyName;
//     });
//     if (index > -1) {
//       this.selectedCondition.splice(index, 1, {
//         value,
//         name: property.propertyName
//       });
//       this.isSelectedHighlight[i].forEach((item, idx) => {
//         this.isSelectedHighlight[i][idx] = false;
//       });
//       this.isSelectedHighlight[i][j] = true;
//     } else {
//       this.selectedCondition.push({
//         value,
//         name: property.propertyName
//       });
//       this.isSelectedHighlight[i][j] = true;
//     }
//
//     // check all properties are selected
//     if (this.selectedCondition.length === this.productDetail.properties.length) {
//       this.isSelectedAllProps = false;
//       // update total items
//       this.productDetail.itemModal.forEach(item => {
//         let k = 0;
//         item.property.forEach(props => {
//           this.selectedCondition.forEach(selectedItem => {
//             if (selectedItem.name === props.name && selectedItem.value === props.value) {
//               k++;
//             }
//           });
//         });
//         if (k === 2) {
//           this.totalItems = item.inventoryValue;
//           this.currentPrice = item.price;
//           this.orderProducts = {
//             itemId: this.productDetail.id,
//             itemModalId: item.id,
//             number: this.amountProduct.value,
//           };
//           this.subProduct = item;
//         }
//       });
//     }
//
//     // set highlight
//     if (index > -1) {
//       this.isSelectedHighlight[i][j] = true;
//     } else {
//       this.isSelectedHighlight[i][j] = true;
//     }
//   }
//
//
//   onOrderProduct() {
//     const dialogRef = this.dialog.open(OrderProductsComponent, {
//       data: {
//         subProducts: this.orderProducts,
//         subProductInformation: {
//           productName: this.productDetail.itemName,
//           product: this.subProduct
//         }
//       }
//     });
//   }
//
//   private loadProductDetail(id: string) {
//     const product$ = this.productService.loadProductById(id).pipe(takeUntil(this.unsubscribe));
//     product$.subscribe((res: ResponseHttp<ProductDetailModel>) => {
//       this.productDetail = res.data;
//       if (this.productDetail) {
//         // this.imagesLink = JSON.parse(this.productDetail.imageLink || '[]');
//         // this.othersLink = JSON.parse(this.productDetail.otherLink || '[]');
//         this.imagesLink = JSON.parse('[]');
//         this.othersLink = JSON.parse('[]');
//         this.calculateTotalItems(this.productDetail);
//         this.setHighLightButton(this.productDetail);
//       }
//     });
//   }
//
//   private calculateTotalItems(productDetail: ProductDetailModel) {
//     productDetail.itemModal.forEach(property => {
//       this.totalItems += property.inventoryValue;
//     });
//   }
//
//   private setHighLightButton(productDetail: ProductDetailModel) {
//     productDetail.properties.forEach((property, i) => {
//       this.isSelectedHighlight.push([]);
//       property.value.forEach((value, j) => {
//         this.isSelectedHighlight[i].push(false);
//       });
//     });
//     logger.debug(this.isSelectedHighlight);
//   }
// }
