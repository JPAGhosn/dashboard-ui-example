import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formSubmittedGuard } from './form-submitted.guard';

describe('formSubmittedGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formSubmittedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
