import {Injectable} from '@angular/core';
import {fmt, mapToFormData, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';
import {BaseService} from './base.service';

const router = {
  loadProducts: `/products/page`,
  loadSubProductById: `/products/getbyid/{productId}`,
  createProduct: `/products/create`,
  updateProduct: `/products/update/{productId}`,
  getProductDetail: `/products/getbyid/{productId}`,
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

  createProduct(
    body: {
      productName: string,
      description: string,
      thumbnail: File,
      price: number,
      amount: number,
      categoryId: number,
      supplierId: number
    }
  ) {
    const formData = mapToFormData(body);
    return this.httpClient.postFormData(router.createProduct, formData);
  }

  updateProduct(
    productId: string,
    body: {
      productName: string,
      description: string,
      thumbnail: File,
      price: number,
      amount: number,
      categoryId: number,
      supplierId: number
    }
  ) {
    const formData = mapToFormData(body);
    const uri = fmt(router.updateProduct, { productId });
    return this.httpClient.postFormData(uri, formData);
  }

  loadProductById(productId: string) {
    const uri = fmt(router.getProductDetail, { productId });
    return this.httpClient.get(uri);
  }
}
