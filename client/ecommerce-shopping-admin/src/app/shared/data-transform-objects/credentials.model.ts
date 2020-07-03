export interface Credentials {
  userName: string;
  token: string;
  refreshToken: string;
  type?: SCHEME_TYPE.BEARER;
}

export enum SCHEME_TYPE {
  BASIC = 'Basic',
  BEARER = 'Bearer',
  NO_SCHEME = ''
}
