import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() listProducts: ProductModel[];
  @Input() title: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewProductDetail(product: ProductModel) {
    this.router.navigateByUrl(`/product/product-detail?id=${product.id}`).then();
  }
}
