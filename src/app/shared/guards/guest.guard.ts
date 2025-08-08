import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthenticationStoreService } from '../services/authentication-store.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { skipWhile, map, takeWhile, skipUntil } from 'rxjs';

export const guestGuard: CanMatchFn = (route, segments) => {
  const authStore = inject(AuthenticationStoreService);
  const router = inject(Router);
  const isAuth = authStore.isAuthenticated();
  const isAuthenticationReady = toObservable(authStore.authenticationReady);

  return isAuthenticationReady.pipe(
    skipWhile((ready) => !ready),
    map((_) => {
      // if (isAuth) router.navigateByUrl('/dashboard');
      return !authStore.isAuthenticated();
    })
  );
};
