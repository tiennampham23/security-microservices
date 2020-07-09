export enum ELocalStorage {
  LAYOUT_CONFIG = 'layoutConfig',
  LANGUAGE = 'language',
  TOKEN = 'accessToken',
  CURRENT_USER = 'currentUser',
  ROLE = 'user_level'
}

export enum EStatusOrders {
  WAIT = 'Đang chờ',
  PACKAGED = 'Đã đóng gói',
  SHIPPING = 'Đang vận chuyển',
  SUCCESS = 'Thành công',
  RETURN = 'Hoàn trả',
  CHANGED = 'Đổi trả',
  OTHER_REQUIREMENT = 'Yêu cầu khác',
  CANCEL = 'Huỷ'
}

export const ListStatus = [
  'Đang chờ', 'Đã đóng gói', 'Đang vận chuyển', 'Thành công', 'Hoàn trả', 'Đổi trả', 'Yêu cầu khác', 'Huỷ'
]

export enum UserLevel {
  LV1 = 1,
  LV2 = 2
}

export const Delivery = [
  {
    name: 'GHN',
    value: 'GHN',
  },
  {
    name: 'GHTK',
    value: 'GHTK',
  },
  {
    name: 'JT',
    value: 'JT',
  },
  {
    name: 'Viettel Post',
    value: 'Viettel Post',
  },
  {
    name: 'Bưu điện',
    value: 'Bưu điện',
  }
];


export enum ESort {
  DESC = '1',
  ASC = '2'
}
