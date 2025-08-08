import { TestBed } from '@angular/core/testing';

import { CompaniesRemoteService } from './companies-remote.service';

describe('CompaniesRemoteService', () => {
  let service: CompaniesRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
