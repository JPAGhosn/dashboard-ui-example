import { Sort } from '@angular/material/sort';

export interface PaginationPayload {
  pageNumber: number;
  pageSize: number;
  filter?: string;
  sort?: Sort;
}
