import { TestBed } from '@angular/core/testing';

import { CookiesHelperService } from './cookies-helper.service';

describe('CookiesHelperService', () => {
  let service: CookiesHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
