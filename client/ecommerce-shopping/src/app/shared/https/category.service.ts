import { Injectable } from '@angular/core';
import {BaseService} from './base.service';

const router = {
  loadCategories: `/categories/all`
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadCategories() {
    return this.httpClient.get(router.loadCategories);
  }
}
