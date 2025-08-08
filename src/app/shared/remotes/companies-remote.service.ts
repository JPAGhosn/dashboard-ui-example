import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, of, timer } from 'rxjs';
import { PaginationPayload } from '../payloads/pagination-payload';
import { PaginationResponse } from '../responses/pagination-response';
import { Company } from '../models/company-model';

@Injectable()
export class CompaniesRemoteService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getTotalCount() {
    // return this.http.get(`${environment.api}/companies/total-count`);

    // Dev only
    return timer(1000).pipe(
      map((_) => {
        return 100;
      })
    );
  }

  getPendingCount() {
    // Dev only
    return timer(1000).pipe(
      map((_) => {
        return 200;
      })
    );
  }

  getApprovedCount() {
    // Dev only
    return timer(1000).pipe(
      map((_) => {
        return 300;
      })
    );
  }

  getOnboardedCompanies(pagination: PaginationPayload) {
    return timer(700).pipe(
      map((_) => {
        return {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          totalRecords: 3,
          data: [
            {
              id: 'ff008305-9005-4e92-892c-03b614a88900',
              name: 'Company A',
              count: 10002,
            },
            {
              id: 'ff008305-9005-4e92-892c-03b614a88901',
              name: 'Company B',
              count: 10003,
            },
            {
              id: 'ff008305-9005-4e92-892c-03b614a88902',
              name: 'Company C',
              count: 10004,
            },
          ],
        } satisfies PaginationResponse<Company>;
      })
    );
  }
}
