import { TestBed } from '@angular/core/testing';

import { AuthenticationRemoteService } from './authentication-remote.service';

describe('AuthenticationRemoteService', () => {
  let service: AuthenticationRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
