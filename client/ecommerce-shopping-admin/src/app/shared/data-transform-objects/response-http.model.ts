export interface ResponseHttp<T> {
  data: T;
  code?: number;
  message?: string;
}
