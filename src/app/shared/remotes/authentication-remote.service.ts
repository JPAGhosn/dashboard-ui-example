import { inject, Injectable } from '@angular/core';
import { map, tap, timer } from 'rxjs';
import { LoginPayload } from '../payloads/login-payload';
import { LoginResponse } from '../responses/login-response';
import { CookiesHelperService } from '../services/cookies-helper.service';

@Injectable()
export class AuthenticationRemoteService {
  private readonly cookiesService = inject(CookiesHelperService);

  constructor() {}

  signUp(payload: any) {
    return timer(1000).pipe();
  }

  signIn(payload: LoginPayload) {
    return timer(700).pipe(
      map((_) => {
        return {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTQ2NTE5NzIsImV4cCI6MTc1NzMxOTU3MSwiZnVsbE5hbWUiOiJKZWFuIFBhdWwgQWJpIEdob3NuIn0.NyvamKc8qrOfJ_NKtgR6epCG6gHD1P5tMH2fjZzbobQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlM2Y3MGIwNS0zYjE1LTRjNDYtOGM2Zi0xNzIyYmJiMmUzYmQiLCJpYXQiOjE3NTQ2Mjc4MDMsImV4cCI6MTc1OTg5ODIwM30.cXfeV3ANlrur2Lzqr8Os9-o4xvCiCXOqJnqfNMmwiGs',
        } satisfies LoginResponse;
      }),
      tap((response) => {
        this.cookiesService.setCookie('accessToken', response.accessToken);
        this.cookiesService.setCookie('refreshToken', response.refreshToken);
      })
    );
  }

  verifyCredentials() {
    return timer(1200).pipe(
      map((_) => {
        return {
          authenticated: true,
        };
      })
    );
  }
}
