export interface PaginationModel<T> {
  content: T;
  pageable?: {
    sort?: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    pageNumber: number,
    pageSize: number,
    offset: number,
    paged: boolean,
    unpaged: boolean
  },
  totalPages: number,
  last: boolean,
  totalElements: number,
  numberOfElements: number,
  size: number,
  number: number,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  first: boolean,
  empty: boolean
}
