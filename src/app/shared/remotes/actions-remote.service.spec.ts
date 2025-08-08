import { TestBed } from '@angular/core/testing';

import { ActionsRemoteService } from './actions-remote.service';

describe('ActionsRemoteService', () => {
  let service: ActionsRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
