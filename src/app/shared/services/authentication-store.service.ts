import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Credentials } from '../models/credentials-model';
import { jwtDecode } from 'jwt-decode';
import { LoaderService } from './loader.service';
import { AuthenticationRemoteService } from '../remotes/authentication-remote.service';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookiesHelperService } from './cookies-helper.service';

@Injectable()
export class AuthenticationStoreService {

  credentials = signal<Credentials | null>(null);

  // Prevent the app to load unless the verification has been done
  authenticationReady = signal(false);

  public readonly isAuthenticated = computed(() => {
    const credentials = this.credentials();
    if (!credentials) {
      return false;
    }

    const isNotExpired = !this.isExpired(credentials.accessToken);

    return isNotExpired;
  });

  private isExpired(token: string) {
    return new Date().valueOf() > jwtDecode(token).exp! * 1000;
  }

  setCredentials(response: Credentials) {
    this.credentials.set(response);
  }
}
