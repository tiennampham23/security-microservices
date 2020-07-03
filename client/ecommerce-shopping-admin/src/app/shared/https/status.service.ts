import { Injectable } from '@angular/core';
import {BaseService} from './base.service';

const router = {
  getStatus: `/status`
};
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadListStatus() {
    return this.httpClient.get(router.getStatus);
  }
}
