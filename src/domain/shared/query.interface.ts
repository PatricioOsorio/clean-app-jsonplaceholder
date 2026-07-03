export interface IGetQueryParams<T> {
  page?: number;
  limit?: number;
  sort?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
