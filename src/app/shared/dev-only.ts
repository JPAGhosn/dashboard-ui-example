import { User } from './models/user-model';
import { PaginationResponse } from './responses/pagination-response';

export function paginateAndFilter<T>(
  data: T[],
  pageNumber: number,
  pageSize: number,
  filter: (v: T) => boolean
) {
  const filtered = data.filter((user) => filter(user));
  const start = (pageNumber - 1) * pageSize;

  return {
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalRecords: filtered.length,
    data: filtered.slice(start, start + pageSize),
  } satisfies PaginationResponse<T>;
}
