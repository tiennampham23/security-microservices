import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../../shared/https/product.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {
  CategoryModel,
  PaginationModel,
  ProductModel,
  ResponseHttp,
  SupplierModel
} from "../../../../shared/models/public-api";
import {CategoryService} from "../../../../shared/https/category.service";
import {SupplierService} from "../../../../shared/https/supplier.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  filterProducts: {
    page?: number,
    size?: number,
    keywords?: string
  } = {
    page: 0,
    size: 10
  }

  products: ProductModel[];
  productsCategory: ProductModel[];
  productsSupplier: ProductModel[];
  categories: CategoryModel[];
  suppliers: SupplierModel[];

  isClickCategory: boolean[] = [];
  isClickSupplier: boolean[] = [];

  private destroyed$ = new Subject();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
  ) { }

  ngOnInit(): void {
    this.loadProducts(this.filterProducts);
    this.loadCategories();
    this.loadSuppliers();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  loadProductsByCategory(category: CategoryModel, index: number) {
    this.isClickCategory.forEach((flag, i) => {
      this.isClickCategory[i] = false;
    });
    this.isClickCategory[index] = true;
    const products$ = this.productService.loadProductByCategoryId(category.id)
      .pipe(takeUntil(this.destroyed$))
    products$.subscribe((res: ResponseHttp<ProductModel[]>) => {
      this.productsCategory = res.data;
    });
  }


  loadProductsBySupplier(supplier: SupplierModel, index : number) {
    this.isClickSupplier.forEach((flag, i) => {
      this.isClickSupplier[i] = false;
    });
    this.isClickSupplier[index] = true;
    const products$ = this.productService.loadProductBySupplierId(supplier.id)
      .pipe(takeUntil(this.destroyed$))
    products$.subscribe((res: ResponseHttp<ProductModel[]>) => {
      this.productsSupplier = res.data;
    });
  }

  private loadProducts(filterProducts: { page?: number; size?: number; keywords?: string }) {
    const products$ = this.productService.loadProducts(filterProducts)
      .pipe(takeUntil(this.destroyed$));

    products$.subscribe((res: ResponseHttp<PaginationModel<ProductModel[]>>) => {
      this.products = res.data.content;
    });
  }

  private loadCategories() {
    const categories$ = this.categoryService.loadCategories()
      .pipe(takeUntil(this.destroyed$));
    categories$.subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
      this.categories.forEach(() => {
        this.isClickCategory.push(false);
      });
      if (this.categories.length > 0) {
        this.loadProductsByCategory(this.categories[0], 0);
      }
    });
  }

  private loadSuppliers() {
    const suppliers$ = this.supplierService.loadSuppliers()
      .pipe(takeUntil(this.destroyed$));
    suppliers$.subscribe((res: ResponseHttp<SupplierModel[]>) => {
      this.suppliers = res.data;
      this.suppliers.forEach(() => {
        this.isClickSupplier.push(false);
      });
      if (this.suppliers.length > 0) {
        this.loadProductsBySupplier(this.suppliers[0], 0);
      }
    });
  }

}
