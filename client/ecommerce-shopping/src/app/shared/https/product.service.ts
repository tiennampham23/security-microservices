import {Injectable} from '@angular/core';
import {fmt, mapToHttpParamsQuery} from "../../core/utils/helper.utils";
import {BaseService} from "./base.service";

const router = {
  loadAllProducts: `/products/home/all`,
  loadProducts: `/products/home/page`,
  getProductDetail: `/products/home/getbyid/{productId}`,
  loadProductsByCategoryId: `/products/home/get-products-by-category`,
  loadProductsBySupplierId: `/products/home/get-products-by-supplier`,
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: BaseService
  ) {
  }

  loadAllProducts() {
    return this.httpClient.get(router.loadAllProducts);
  }

  loadProducts(filter?: {
    page?: number,
    size?: number,
    keywords?: string
  }) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.get(router.loadProducts, params);
  }


  loadProductById(productId: number) {
    const uri = fmt(router.getProductDetail, { productId });
    return this.httpClient.get(uri);
  }

  loadProductByCategoryId(categoryId: number) {
    const params = mapToHttpParamsQuery({categoryId});
    return this.httpClient.get(router.loadProductsByCategoryId, params);
  }

  loadProductBySupplierId(supplierId: number) {
    const params = mapToHttpParamsQuery({supplierId});
    return this.httpClient.get(router.loadProductsBySupplierId, params);
  }
}
