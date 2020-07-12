import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @Input() title: string;
  @Input() listProducts: ProductModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
