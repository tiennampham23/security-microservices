export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: 'Trang chủ',
        desc: 'Latest updates and statistic charts'
      },
    },
    forms: {
      page: {title: 'Forms', desc: ''}
    },
    ecommerce: {
      customers: {
        page: {title: 'Customers', desc: ''}
      },
      products: {
        edit: {
          page: {title: 'Edit product', desc: ''}
        },
        add: {
          page: {title: 'Create product', desc: ''}
        }
      },
      orders: {
        page: {title: 'Orders', desc: ''}
      }
    },
    'user-management': {
      users: {
        page: {title: 'Users', desc: ''}
      },
      roles: {
        page: {title: 'Roles', desc: ''}
      }
    },
    header: {
      actions: {
        page: {title: 'Actions', desc: 'Actions example page'}
      }
    },
    profile: {
      page: {title: 'User Profile', desc: ''}
    },
    error: {
      404: {
        page: {title: '404 Not Found', desc: '', subheader: false}
      },
      403: {
        page: {title: '403 Access Forbidden', desc: '', subheader: false}
      }
    },
    wizard: {
      'wizard-1': {page: {title: 'Wizard 1', desc: ''}},
      'wizard-2': {page: {title: 'Wizard 2', desc: ''}},
      'wizard-3': {page: {title: 'Wizard 3', desc: ''}},
      'wizard-4': {page: {title: 'Wizard 4', desc: ''}},
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
