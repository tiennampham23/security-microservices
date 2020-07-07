import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductDataSource} from '@drop-shipping/shared/data-sources/public-api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {merge, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AuthenticationService,
  CategoryService,
  ProductService,
  SupplierService
} from '@drop-shipping/shared/https/public-api';
import {SubHeaderService} from '@drop-shipping/shared/services/public-api';
import {debounceTime, distinctUntilChanged, skip, tap} from 'rxjs/operators';
import {
  CategoryModel,
  ProductModel,
  ResponseHttp,
  SupplierModel
} from '@drop-shipping/shared/data-transform-objects/public-api';
import {SelectionModel} from '@angular/cdk/collections';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from "@angular/material/select";

const logger = new Logger('ProductListComponent');

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  dataSource: ProductDataSource;

  filterSearchProduct: {
    page: number,
    number: number,
    keywords: string
  } = {
    page: 0,
    number: 0,
    keywords: null
  };

  categories: CategoryModel[];
  suppliers: SupplierModel[];

  products: ProductModel[] = [];

  selection = new SelectionModel<ProductModel>(true, []);
  displayedColumns = [
    'select',
    'productName',
    'thumbnail',
    'price',
    'amount',
    'category',
    'supplier',
    'actions'
  ];

  keywords = new FormControl('');


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private subheaderService: SubHeaderService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
  ) {
    this.filterSearchProduct.page = 0;
    this.filterSearchProduct.number = 10;
  }

  ngOnInit(): void {
    this.subheaderService.setTitle('Danh sách sản phẩm');
    this.dataSource = new ProductDataSource(this.productService);
    this.loadProducts(this.filterSearchProduct);
    this.loadCategories();
    this.loadSuppliers();
    this.subscribePaginator();
    this.subscribeSearchKeyword();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  editProduct(id) {
    return this.router.navigateByUrl(`/product/update/${id}`);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.products.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.products.forEach(row => this.selection.select(row));
    }
  }

  onShowDetailProduct(product: ProductModel) {
    return this.router.navigate(['product', product.id]);
  }

  deleteProducts() {
    logger.debug(this.selection.selected);
  }

  deleteProduct(product) {
  }

  fetchProducts() {
  }

  updateStatusForProducts() {
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

  loadProducts(filterSearchProduct: {
    page: number,
    number: number,
    keywords: string
  }) {
    this.dataSource.loadProducts(filterSearchProduct);
    const entitiesSubscription = this.dataSource.entitiesSubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.products = res;
    });
    this.subscriptions.push(entitiesSubscription);
    this.selection.clear();
  }

  private subscribePaginator() {
    const paginatorSubscriptions = merge(this.paginator.page).pipe(
      tap(($event: PageEvent) => {
        this.filterSearchProduct.page = $event.pageIndex;
        this.filterSearchProduct.number = $event.pageSize;
        this.loadProducts(this.filterSearchProduct);
      })
    ).subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }

  private subscribeSearchKeyword() {
    const searchTextKeywordSubscription = this.keywords.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.filterSearchProduct.page = 0;
      this.filterSearchProduct.number = 10;
      this.filterSearchProduct.keywords = text;
      this.loadProducts(this.filterSearchProduct);
    });
    this.subscriptions.push(searchTextKeywordSubscription);
  }

  private loadCategories() {
    const categoriesSubscription = this.categoryService.loadCategories().subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
    });
    this.subscriptions.push(categoriesSubscription);
  }

  private loadSuppliers() {
    const suppliersSubscription = this.supplierService.loadSuppliers().subscribe((res: ResponseHttp<SupplierModel[]>) => {
      this.suppliers = res.data;
    });
    this.subscriptions.push(suppliersSubscription);
  }
}
