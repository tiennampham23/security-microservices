export class MenuConfig {
  public menus: any = {
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
          title: 'Lịch sử đặt hàng',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/order',
          // translate: 'MENU.PRODUCT',
          bullet: 'dot',
        }
      ]
    },
  };

  public get getMenus(): any {
    return this.menus;
  }
}
