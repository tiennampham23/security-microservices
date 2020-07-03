import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {CategoryService, ProductService} from '@drop-shipping/shared/https/public-api';
import {CategoryModel, ProductDetailModel, ResponseHttp} from '@drop-shipping/shared/data-transform-objects/public-api';
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
  imagesLinkFormArray: FormArray;
  othersLinkFormArray: FormArray;
  itemModalFormArray: FormArray;

  categories: CategoryModel[];
  productDetail: ProductDetailModel;
  productId: string;
  typeAction = 'CREATE';
  image: File;

  previewImage: string | ArrayBuffer;

  displayedColumns = [
    'Giá (vnđ)',
    'Kho hàng',
    'SKU phân loại'
  ];

  isSingleProperty = true;
  isHasSubProducts = false;
  data = {
    itemModals: [
      // {
      //   classifyName: '',
      //   classifyValues: [
      //     {
      //       value: ''
      //     }
      //   ]
      // }
    ],
    othersLink: [
      {
        otherLink: ''
      }
    ],
    imagesLink: [
      {
        imageLink: ''
      }
    ]
  };

  values = [];

  maxClassifyGroup = 2;

  firstPropertyValues = [];
  secondPropertyValues = [];

  private unsubscribe = new Subject<any>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService,
    private productService: ProductService
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
    this.imagesLinkFormArray = this.productFormGroup.get('imagesLink') as FormArray;
    this.othersLinkFormArray = this.productFormGroup.get('othersLink') as FormArray;
    this.itemModalFormArray = this.productFormGroup.get('itemModals') as FormArray;
    this.loadCategories();
    if (this.typeAction === 'CREATE') {
      this.setItemModals();
      this.setImagesLink();
      this.setOthersLink();
    }
    this.subscribeItemModalsChange();
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
        avatar: event.target.files[0]
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteImage() {
    this.previewImage = null;
    this.image = null;
  }

  addNewImageLink() {
    const controls = this.imagesLinkFormArray;
    controls.push(this.createImagesLinkFormControls());
  }

  addClassifyGroup() {
    this.isHasSubProducts = true;
    const controls = this.productFormGroup.controls.itemModals as FormArray;
    controls.push(this.formBuilder.group({
      classifyName: [''],
      classifyValues: this.formBuilder.array([])
    }));

    if (this.itemModalFormArray.controls.length > 1) {
      this.isSingleProperty = false;
      this.values = [];
    }
  }

  addClassifyValue(control, i: number) {
    control.push(
      this.formBuilder.group({
        value: ['']
      })
    );
    if (this.secondPropertyValues.length === 0) {
      this.values.push({
        amount: '',
        price: '',
        sku: ''
      });
    } else {
      if (this.values.length === 0) {
        this.values = new Array(this.firstPropertyValues.length);
      }
      if (i === 0) {
        this.values.push([]);
        this.secondPropertyValues.forEach((sProperty, j) => {
          this.values[this.values.length - 1].push({
            amount: '',
            price: '',
            sku: ''
          });
        });
      }

      if (i === 1) {
        this.firstPropertyValues.forEach((property, index) => {
          if (!this.values[index]) {
            this.values[index] = [];
          }
          this.values[index].push({
            amount: '',
            price: '',
            sku: ''
          });
        });
      }
    }
    logger.debug(this.values);
  }

  addNewOtherLink() {
    const controls = this.othersLinkFormArray;
    controls.push(this.createOthersLinkFormControls());
  }

  removeClassifyValue(control, index: number, i: number) {
    if (i === 0) {
      this.firstPropertyValues.splice(index, 1);
      this.values.splice(0, 1);
    } else if (i === 1) {
      this.secondPropertyValues.splice(index, 1);
      this.secondPropertyValues.forEach((item, j) => {
        this.values[j].splice(0, 1);
      });
    }
    control.removeAt(index);
  }

  removeClassifyGroup(index: number) {
    const controls = this.itemModalFormArray;
    controls.removeAt(index);

    if (controls.length === 0) {
      this.isHasSubProducts = false;
    }

    if (index === 0) {
      this.firstPropertyValues = [...this.secondPropertyValues];
    }
    this.secondPropertyValues = [];
    this.isSingleProperty = true;
    this.values = [];
    this.displayedColumns.splice(index, 1);
    this.firstPropertyValues.forEach((props, i) => {
      this.values.push({
        amount: '',
        price: '',
        sku: ''
      });
    });
  }


  onSaveProduct() {
    const imagesLink = [];
    const othersLink = [];
    const itemModals = [];
    this.productFormGroup.controls.imagesLink.value.forEach((link) => {
      imagesLink.push(link.imageLink);
    });
    this.productFormGroup.controls.othersLink.value.forEach((link) => {
      othersLink.push(link.otherLink);
    });

    this.firstPropertyValues.forEach((fProperty, i) => {
      if (this.secondPropertyValues.length > 0) {
        this.secondPropertyValues.forEach((sProperty, j) => {
          const propertyItem = [];
          propertyItem.push({
            property: this.displayedColumns[0],
            value: fProperty.value
          });
          propertyItem.push({
            property: this.displayedColumns[1],
            value: sProperty.value
          });

          const item = {
            inventoryValue: this.values[i][j].amount,
            price: this.values[i][j].price,
            code: this.values[i][j].sku,
          };
          itemModals.push({
            propertyItem,
            item
          });
        });
      } else {
        const propertyItem = [];
        propertyItem.push({
          property: this.displayedColumns[0],
          value: fProperty.value
        });
        const item = {
          inventoryValue: this.values[i].amount,
          price: this.values[i].price,
          code: this.values[i].sku,
        };
        itemModals.push({
          propertyItem,
          item
        });
      }
    });

    const body = {
      avatar: this.productFormGroup.controls.avatar.value,
      code: this.productFormGroup.controls.code.value,
      name: this.productFormGroup.controls.name.value,
      description: this.productFormGroup.controls.description.value,
      price: this.productFormGroup.controls.price.value,
      shippingFee: this.productFormGroup.controls.shippingFee.value,
      weight: this.productFormGroup.controls.weight.value,
      inventoryValue: this.productFormGroup.controls.inventoryValue.value,
      height: this.productFormGroup.controls.height.value,
      width: this.productFormGroup.controls.width.value,
      categoryId: this.productFormGroup.controls.categoryId.value,
      imageLink: JSON.stringify(imagesLink),
      otherLink: JSON.stringify(othersLink),
      itemModals: JSON.stringify(itemModals)
    };

    logger.debug(body);

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
      avatar: [''],
      code: [''],
      name: [''],
      description: [''],
      price: [0],
      shippingFee: [''],
      weight: [''],
      inventoryValue: [0],
      height: [''],
      width: [''],
      categoryId: [''],
      imagesLink: this.formBuilder.array([]),
      othersLink: this.formBuilder.array([]),
      itemModals: this.formBuilder.array([])
    });
  }

  private createImagesLinkFormControls(): FormGroup {
    return this.formBuilder.group({
      imageLink: ''
    });
  }

  private createOthersLinkFormControls(): FormGroup {
    return this.formBuilder.group({
      otherLink: ''
    });
  }

  private loadCategories() {
    const categories$ = this.categoryService.loadCategories().pipe(takeUntil(this.unsubscribe));
    categories$.subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
    });
  }

  private setItemModals() {
    const controls = this.itemModalFormArray;
    this.data.itemModals.forEach(x => {
      controls.push(this.formBuilder.group({
        classifyName: x.classifyName,
        classifyValues: this.setClassifyValues(x)
      }));
    });
  }

  private setClassifyValues(x) {
    const arr = new FormArray([]);
    x.classifyValues.forEach((y) => {
      arr.push(this.formBuilder.group({
        value: y.value
      }));
    });
    return arr;
  }

  private setImagesLink() {
    const controls = this.imagesLinkFormArray;
    this.data.imagesLink.forEach(imageLink => {
      controls.push(this.formBuilder.group({
        imageLink: imageLink.imageLink
      }));
    });
  }

  private setOthersLink() {
    const controls = this.othersLinkFormArray;
    this.data.othersLink.forEach(otherLink => {
      controls.push(this.formBuilder.group({
        otherLink: otherLink.otherLink
      }));
    });
  }

  private subscribeItemModalsChange() {
    this.itemModalFormArray.valueChanges.subscribe((res) => {
      this.updateDisplayedColumns(res);
      this.updatePropertiesValues(res);
    });
  }

  private updateDisplayedColumns(formValues: {
    classifyName: string,
    classifyValues: string[]
  }[]) {
    formValues.forEach((value, index) => {
      if (index === 0) {
        if (this.displayedColumns.length <= 3) {
          this.displayedColumns.splice(0, 0, value.classifyName);
        } else {
          this.displayedColumns.splice(0, 1, value.classifyName);
        }
      }
      if (index === 1) {
        if (this.displayedColumns.length <= 4) {
          this.displayedColumns.splice(1, 0, value.classifyName);
        } else {
          this.displayedColumns.splice(1, 1, value.classifyName);
        }
      }
    });
  }

  private updatePropertiesValues(formValues: {
    classifyName: string,
    classifyValues: string[]
  }[]) {
    formValues.forEach((value, index) => {
      if (index === 0) {
        this.firstPropertyValues = [...value.classifyValues];
      }
      if (index === 1) {
        this.secondPropertyValues = [...value.classifyValues];
      }
    });
  }

  private loadProductById(productId: string) {
    const product$ = this.productService.loadProductById(productId).pipe(takeUntil(this.unsubscribe));
    product$.subscribe((res: {
      data: ProductDetailModel
    }) => {
      this.productDetail = res.data;
      logger.debug(this.productDetail);
      if (this.productDetail) {
        this.setValuesForm(this.productDetail);
      }
    });
  }

  private setValuesForm(productDetail: ProductDetailModel) {
    this.productFormGroup.patchValue({
      avatar: productDetail.avatar,
      code: productDetail.code,
      name: productDetail.itemName,
      description: productDetail.description,
      height: productDetail.height,
      shippingFee: productDetail.shippingFee,
      totalNumber: productDetail.totalNumber,
      weight: productDetail.weight,
      width: productDetail.width,
      categoryId: productDetail.categoryId
    });
    this.previewImage = productDetail.avatar;

    if (productDetail.properties.length >= 2) {
      this.isSingleProperty = false;
    }

    const itemModals = [];
    this.productDetail.properties.forEach(property  => {
      const values = [];
      property.value.forEach((v) => {
        values.push({
          value: v
        });
      });
      const item = {
        classifyName: property.propertyName,
        classifyValues: [...values]
      };
      itemModals.push(item);
    });
    this.data.itemModals = [...itemModals];
    this.setItemModals();

    const imagesLink: string[] = JSON.parse(productDetail.imageLink);
    const images = [];
    imagesLink.forEach((link) => {
      images.push({
        imageLink: link
      });
    });
    this.data.imagesLink = [...images];
    const othersLink: string[] = JSON.parse(productDetail.otherLink);
    const others = [];
    othersLink.forEach((link) => {
      others.push({
        otherLink: link
      });
    });
    this.data.imagesLink = [...images];
    this.data.othersLink = [...others];
    this.setImagesLink();
    this.setOthersLink();

    if (this.productDetail.properties.length === 2) {
      this.values = new Array(this.firstPropertyValues.length);
      this.firstPropertyValues.forEach((fProperty, index) => {
        this.values[index] = new Array(this.secondPropertyValues.length);
      });
      this.firstPropertyValues.forEach((fProperty, i) => {
        this.secondPropertyValues.forEach((sProperty, j) => {
          this.productDetail.itemModal.forEach(item => {
            if ((item.property[0].value === fProperty.value && item.property[1].value === sProperty.value) ||
              (item.property[0].value === sProperty.value && item.property[1].value === fProperty.value)) {
              this.values[i].splice(j, 1, {
                  amount: item.inventoryValue,
                  price: item.price,
                  sku: item.code
              });
            }
          });
        });
      });
    } else if (this.productDetail.properties.length === 1) {
      // this.values = new Array(this.)
      this.values = new Array(this.firstPropertyValues);
      this.firstPropertyValues.forEach((fProperty, i) => {
        this.productDetail.itemModal.forEach(item => {
          if (item.property[0].value === fProperty.value) {
            this.values.splice(i, 1, {
                amount: item.inventoryValue,
                price: item.price,
                sku: item.code
            });
          }
        });
      });
    }
    logger.debug(this.values);

    if (productDetail.properties.length > 0) {
      this.isHasSubProducts = true;
    }
    this.cdr.detectChanges();
  }
}
