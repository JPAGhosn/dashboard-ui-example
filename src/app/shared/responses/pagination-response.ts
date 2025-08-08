export interface PaginationResponse<T> {
  pageNumber: number;
  pageSize: number;
  data: T[];
  totalRecords: number;
}
