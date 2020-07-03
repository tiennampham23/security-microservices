import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {mapToFormData} from "@drop-shipping/core/utils/helper.utils";

const router = {
  uploadImage: `/image/upload`
}

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private httpClient: BaseService
  ) { }

  uploadImage(body: {
    image: any
  }) {
    const image = mapToFormData(body);
    return this.httpClient.postFormData(router.uploadImage, image);
  }
}
