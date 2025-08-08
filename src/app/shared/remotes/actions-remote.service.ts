import { Injectable } from '@angular/core';
import { PaginationPayload } from '../payloads/pagination-payload';
import { map, timer } from 'rxjs';
import { PaginationResponse } from '../responses/pagination-response';
import { Action } from '../models/action-model';

const DATA: Action[] = [
  {
    id: '691dffac-6178-4ded-bc91-214040810a6f',
    name: 'Active User',
    date: new Date(),
    user: {
      id: '57091da9-c113-4cc3-accd-b5ec0df9f2b9',
      fullName: 'Rawad Richa',
      email: 'someEmail@emcrey.com',
      lastLogin: new Date().toString() as any,
    },
  },
  {
    id: '691dffac-6178-4ded-bc91-214040810a6f',
    name: 'Deactivate User',
    date: new Date(),
    user: {
      id: '57091da9-c113-4cc3-accd-b5ec0df9f2b9',
      fullName: 'Rawad Richa',
      email: 'someEmail@emcrey.com',
      lastLogin: new Date().toString() as any,
    },
  },
  {
    id: '691dffac-6178-4ded-bc91-214040810a6f',
    name: 'Add approval workflow',
    date: new Date(),
    user: {
      id: '57091da9-c113-4cc3-accd-b5ec0df9f2b9',
      fullName: 'Rawad Richa',
      email: 'someEmail@emcrey.com',
      lastLogin: new Date().toString() as any,
    },
  },
];

@Injectable()
export class ActionsRemoteService {
  getActions(pagination: PaginationPayload) {
    const request = timer(2000).pipe(
      map((_) => {
        return {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          data: DATA.filter((action) =>
            action.name.toLowerCase().startsWith(pagination.filter ?? '')
          ),
          totalRecords: 3,
        } satisfies PaginationResponse<Action>;
      })
    );

    return request.pipe(
      map((response) => {
        for (const action of response.data) {
          action.date = new Date(action.date);
        }
        return response;
      })
    );
  }

  constructor() {}
}
