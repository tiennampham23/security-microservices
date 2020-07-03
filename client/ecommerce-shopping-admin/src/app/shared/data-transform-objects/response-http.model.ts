export interface ResponseHttp<T> {
  total?: number;
  totalCount?: number;
  data: T;
  length?: number;
  message?: string;
}
