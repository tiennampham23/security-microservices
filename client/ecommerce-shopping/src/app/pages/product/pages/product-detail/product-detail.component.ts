import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../shared/https/product.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ResponseHttp} from "../../../../shared/models/response-http.model";
import {ProductModel} from "../../../../shared/models/product.model";
import {DomSanitizer} from "@angular/platform-browser";
import {CategoryService} from "../../../../shared/https/category.service";
import {SupplierService} from "../../../../shared/https/supplier.service";
import {CategoryModel, SupplierModel} from "../../../../shared/models/public-api";
import {CartService} from "../../../../shared/singleton-services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: ProductModel;
  categories: CategoryModel[];
  suppliers: SupplierModel[];
  private destroyed$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private cartService: CartService,
    private sanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.getProductDetailById(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  addProductToCart(product: ProductModel, number: number) {
    this.cartService.addItem(product, 1);
  }

  bypassSecurityTrustHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCategoryName(categoryId: number) {
    if (this.categories) {
      let categoryName = null;
      this.categories.forEach(category => {
        if (categoryId ===  category.id) {
          categoryName = category.categoryName;
        }
      });
      return categoryName;
    }
  }

  getSupplierName(supplierId: number) {
    if (this.suppliers) {
      let supplierName = null;
      this.suppliers.forEach(supplier => {
        if (supplierId ===  supplier.id) {
          supplierName =  supplier.supplierName;
        }
      });
      return supplierName;
    }
  }

  private getProductDetailById(id: number) {
    const product$ = this.productService.loadProductById(id)
      .pipe(takeUntil(this.destroyed$));
    product$.subscribe((res: ResponseHttp<ProductModel>) => {
      this.product = res.data;
    });
  }

  private loadCategories() {
    const categories$ = this.categoryService.loadCategories().pipe(takeUntil(this.destroyed$));
    categories$.subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
    });
  }

  private loadSuppliers() {
    const suppliers$ = this.supplierService.loadSuppliers().pipe(takeUntil(this.destroyed$))
    suppliers$.subscribe((res: ResponseHttp<SupplierModel[]>) => {
      this.suppliers = res.data;
    });
  }
}
