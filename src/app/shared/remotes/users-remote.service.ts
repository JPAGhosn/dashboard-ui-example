import { Injectable } from '@angular/core';
import { filter, map, timer } from 'rxjs';
import { PaginationPayload } from '../payloads/pagination-payload';
import { PaginationResponse } from '../responses/pagination-response';
import { User } from '../models/user-model';
import { paginateAndFilter } from '../dev-only';

const DATA: User[] = [
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b10',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b11',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b12',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b13',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b14',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b15',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b16',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b17',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b18',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'afa19142-a234-4a9e-81c5-e746671e7b19',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a880',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a881',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a882',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a883',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a884',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a885',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a886',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
  {
    id: 'cb7a96fb-8d39-408b-891d-6322fc70a887',
    fullName: 'Jean Paul Abi Ghosn',
    email: 'jpag@emcrey.com',
    lastLogin: new Date().toString() as any,
  },
];

@Injectable()
export class UsersRemoteService {
  getUsers(pagination: PaginationPayload) {
    return timer(2000)
      .pipe(
        map((_) => {
          return paginateAndFilter(
            DATA,
            pagination.pageNumber,
            pagination.pageSize,
            (v) => v.fullName.toLowerCase().startsWith(pagination.filter ?? '')
          );
        })
      )
      .pipe(
        map((response) => {
          for (const user of response.data) {
            user.lastLogin = new Date(user.lastLogin);
          }

          return response;
        })
      );
  }
  constructor() {}

  getTotalCorporateUsersCount() {
    return timer(1000).pipe(
      map((_) => {
        return 100;
      })
    );
  }

  getTotalBankUsersCount() {
    return timer(1000).pipe(
      map((_) => {
        return 100;
      })
    );
  }

  getCorporateOnlineUsersCount() {
    return timer(1000).pipe(
      map((_) => {
        return 100;
      })
    );
  }

  getBankOnlineUsersCount() {
    return timer(1000).pipe(
      map((_) => {
        return 100;
      })
    );
  }
}
