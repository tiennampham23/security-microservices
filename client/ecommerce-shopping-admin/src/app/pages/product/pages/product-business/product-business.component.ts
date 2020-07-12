import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {CategoryService, ProductService, SupplierService} from '@drop-shipping/shared/https/public-api';
import {
  CategoryModel,
  ProductModel,
  ResponseHttp,
  SupplierModel
} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';

const logger = new Logger('ProductBusinessComponent');

@Component({
  selector: 'app-product-business',
  templateUrl: './product-business.component.html',
  styleUrls: ['./product-business.component.scss']
})
export class ProductBusinessComponent implements OnInit, OnDestroy {
  loading$: any;
  productFormGroup: FormGroup;

  categories: CategoryModel[];
  suppliers: SupplierModel[];

  productDetail: ProductModel;
  productId: string;
  typeAction = 'CREATE';
  image: File;

  previewImage: string | ArrayBuffer;


  values = [];

  private unsubscribe = new Subject<any>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackbarService: SnackbarService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
  ) {
    this.initialForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.productId = params.id;
        this.typeAction = 'UPDATE';
        this.loadProductById(this.productId);
      }
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getComponentTitle() {
    return `Thêm mới sản phẩm`;
  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => (this.previewImage = reader.result);
      this.image = event.target.files[0];
      this.productFormGroup.patchValue({
        thumbnail: event.target.files[0]
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteImage() {
    this.previewImage = null;
    this.image = null;
  }


  onSaveProduct() {
    const body = this.productFormGroup.value;
    if (this.typeAction === 'CREATE') {
      const createProduct$ = this.productService.createProduct(body).pipe(takeUntil(this.unsubscribe));
      createProduct$.subscribe((res) => {
        this.snackbarService.showSuccess(`Thêm mới sản phẩm thành công`);
      }, (err) => {
        this.snackbarService.showError(`Thêm mới sản phẩm thất bại`);
      });
    }

    if (this.typeAction === 'UPDATE') {
      const updateProduct$ = this.productService.updateProduct(this.productId, body).pipe(takeUntil(this.unsubscribe));
      updateProduct$.subscribe((res) => {
        this.snackbarService.showSuccess(`Cập nhập sản phẩm thành công`);
      }, () => {
        this.snackbarService.showError(`Cập nhập sản phẩm thất bại`);
      });
    }
  }

  private initialForm() {
    this.productFormGroup = this.formBuilder.group({
      productName: [''],
      description: [''],
      thumbnail: [''],
      price: [0],
      amount: [0],
      categoryId: [''],
      supplierId: [0]
    });
  }


  private loadProductById(productId: string) {
    const product$ = this.productService.loadProductById(productId).pipe(takeUntil(this.unsubscribe));
    product$.subscribe((res: {
      data: ProductModel
    }) => {
      this.productDetail = res.data;
      if (this.productDetail) {
        this.setValuesForm(this.productDetail);
      }
    });
  }

  private setValuesForm(productDetail: ProductModel) {
    this.productFormGroup.patchValue({
      productName: productDetail.productName,
      description: productDetail.description,
      thumbnail: null,
      price: productDetail.price,
      amount: productDetail.amount,
      categoryId: productDetail.categoryId,
      supplierId: productDetail.supplierId,
    });
    this.previewImage = productDetail.thumbnail;
    this.cdr.detectChanges();
  }

  private loadCategories() {
    const categories$ = this.categoryService.loadCategories()
      .pipe(takeUntil(this.unsubscribe));
    categories$.subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
    });
  }

  private loadSuppliers() {
    const suppliers$ = this.supplierService.loadSuppliers()
      .pipe(takeUntil(this.unsubscribe));
    suppliers$.subscribe((res: ResponseHttp<SupplierModel[]>) => {
      this.suppliers = res.data;
    });
  }
}
