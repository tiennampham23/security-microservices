import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderProduct, SubProduct} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {FormBuilder, FormGroup} from '@angular/forms';

const logger = new Logger('OrderProductsComponent');

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  orderProductFormGroup: FormGroup;
  subProducts: OrderProduct;
  subProductInformation: {
    productName: string,
    product: SubProduct
  };
  properties: {
    id: string;
    value: string;
    name: string;
  }[];
  constructor(
    public dialogRef: MatDialogRef<OrderProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subProducts: OrderProduct,
      subProductInformation: {
        productName: string,
        product: SubProduct
      }
    },
    private formBuilder: FormBuilder
  ) {
    this.subProducts = data.subProducts;
    this.subProductInformation = data.subProductInformation;
    this.properties = data.subProductInformation.product.property;
    logger.debug(this.properties);
    this.initializeForms();
  }

  ngOnInit(): void {
  }

  private initializeForms() {
    this.orderProductFormGroup = this.formBuilder.group({
      code: [''],
      deliveryAgent: [''],
      deliveryCode: ['']
    });
  }
}
