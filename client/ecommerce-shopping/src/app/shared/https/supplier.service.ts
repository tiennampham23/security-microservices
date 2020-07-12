import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

const router = {
  loadSuppliers: `/suppliers/all`
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadSuppliers() {
    return this.httpClient.get(router.loadSuppliers);
  }
}
