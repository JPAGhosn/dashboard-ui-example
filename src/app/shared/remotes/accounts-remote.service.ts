import { Injectable } from '@angular/core';
import { timer, map } from 'rxjs';

@Injectable()
export class AccountsRemoteService {
  constructor() {}

  getTotalCount() {
    // return this.http.get(`${environment.api}/companies/total-count`);

    // Dev only
    return timer(1000).pipe(
      map((_) => {
        throw 'An error occured';
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
}
