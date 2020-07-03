import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {fmt, mapToFormData, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';

const router = {
  loadUsersLevel2: `/users/childs`,
  changeBalance: `/users/change-balance/{userId}`,
  createUserLv2: `/users/create-user`,
  updateUserLv2: `/users/create-user`,
  blockUserLv2: `/users/block/{userId}`,
  unBlockUserLv2: `/users/unblock/{userId}`,
  changePassword: `/auth/change-password`,
  changePasswordChildUser: `/auth/change-child-password/{userId}`,
  changeAvatar: `/users/avatar`,
  changeProfileUser: `/users/`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: BaseService
  ) {
  }

  loadChildUsers(
    filter: {
      page: number,
      size: number,
      _keyword: string,
      sort: number,
      propertySort: string
    }
  ) {
    const sort = `sorts[${filter.propertySort}]`;
    const filterSort = {
      page: filter.page,
      size: filter.size,
      _keyword: filter._keyword,
    };
    filterSort[sort] = filter.sort;
    const params = mapToHttpParamsQuery(filterSort);
    return this.httpClient.get(router.loadUsersLevel2, params);
  }

  changeBalanceUser(
    userId: string,
    body: {
      value: number,
      note: string,
      transactionType: number
    }
  ) {
    const uri = fmt(router.changeBalance, {userId});
    return this.httpClient.post(uri, body);
  }

  createChildUser(
    body: {
      username: string,
      password: string,
      rePassword: string,
      email: string,
      phone: string,
      name: string
    }
  ) {
    return this.httpClient.post(router.createUserLv2, body);
  }

  updateChildUser(
    userId: string,
    body: {
      username: string,
      password: string,
      rePassword: string,
      email: string,
      phone: string,
      name: string
    }
  ) {
    const uri = fmt(router.updateUserLv2, {userId});
    return this.httpClient.post(uri, body);
  }

  blockUserLv2(userId: string) {
    const uri = fmt(router.blockUserLv2, {userId});
    return this.httpClient.put(uri);
  }

  unBlockUserLv2(userId: string) {
    const uri = fmt(router.unBlockUserLv2, {userId});
    return this.httpClient.put(uri);
  }

  changePassword(
    body: {
      oldPassword: string,
      newPassword: string,
      reNewPassword: string
    }
  ) {
    return this.httpClient.post(router.changePassword, body);
  }

  changePasswordChildUser(
    userId: string,
    body: {
      password: string,
      rePassword: string
    }
  ) {
    const uri = fmt(router.changePasswordChildUser, {userId});
    return this.httpClient.post(uri, body);
  }

  changeAvatar(
    body: {
      avatar: File
    }
  ) {
    const formData = mapToFormData(body);
    return this.httpClient.put(router.changeAvatar, formData);
  }

  changeProfile(
    body: {
      email: string,
      phone: string,
      name: string
    }
  ) {
    return this.httpClient.put(router.changeProfileUser, body);
  }
}
