import {UserLevel} from '@drop-shipping/core/constants/app.constant';

export class MenuConfig {
  public userLevel1: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Trang chủ',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Sản phẩm',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/product',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Người dùng',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/user',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Đặt hàng',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/order',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Lịch sử giao dịch',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/transaction',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Thông báo',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/notification',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
      ]
    },
  };
  public userLevel1Block: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Trang chủ',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Sản phẩm',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/product',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
      ]
    },
  };
  public userLevel2: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Trang chủ',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Sản phẩm',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/product',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Đặt hàng',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/order',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Tạo mới đặt hàng',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/order-product',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
        {
          title: 'Lịch sử giao dịch',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/transaction',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        },
      ]
    },
  };
  public userLevel2Block: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Trang chủ',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Sản phẩm',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/product',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        }
      ]
    },
  };

  public get configsUserLevel1(): any {
    return this.userLevel1;
  }

  public get configsUserLevel1Block(): any {
    return this.userLevel1Block;
  }

  public get configsUserLevel2Block(): any {
    return this.userLevel2Block;
  }


  public get configsUserLevel2(): any {
    return this.userLevel2;
  }
}
