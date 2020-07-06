import {Injectable} from '@angular/core';
import {fmt, mapToFormData, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';
import {BaseService} from './base.service';

const router = {
  loadProducts: `/products/page`,
  loadSubProductById: `/items/list-modal/{productId}`,
  createProduct: `/items`,
  updateProduct: `/items/{productId}`,
  getProductDetail: `/items/{productId}`
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: BaseService
  ) {
  }

  loadProducts(filter?: {
    page?: number,
    number?: number,
    keywords?: string
  }) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.get(router.loadProducts, params);
  }

  loadSubProductById(productId: string) {
    const uri = fmt(router.loadSubProductById, {productId});
    return this.httpClient.get(uri);
  }

  createProduct(
    body: {
      avatar: File,
      code: string,
      name: string,
      description: string,
      price: string,
      shippingFee: string,
      weight: string,
      inventoryValue: string,
      height: string,
      width: string,
      categoryId: string,
      imageLink: string,
      otherLink: string,
      itemModals: string
    }
  ) {
    const formData = mapToFormData(body);
    return this.httpClient.postFormData(router.createProduct, formData);
  }

  updateProduct(
    productId: string,
    body: {
      avatar: File | string,
      code: string,
      name: string,
      description: string,
      price: string,
      shippingFee: string,
      weight: string,
      inventoryValue: string,
      height: string,
      width: string,
      categoryId: string,
      imageLink: string,
      otherLink: string,
      itemModals: string
    }
  ) {
    const formData = mapToFormData(body);
    const uri = fmt(router.updateProduct, { productId });
    return this.httpClient.putFormData(uri, formData);
  }

  loadProductById(productId: string) {
    const uri = fmt(router.getProductDetail, { productId });
    return this.httpClient.get(uri);
  }
}
