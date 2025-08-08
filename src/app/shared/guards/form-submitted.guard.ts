import { CanDeactivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const formSubmittedGuard: CanDeactivateFn<any> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const router = inject(Router);

  const submitted = component.submitted();

  if (!submitted) {
    return false;
  }

  console.log('Can exit', submitted);

  return submitted;
};
