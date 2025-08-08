import { Component, DestroyRef, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderCurtainComponent } from './shared/components/loader-curtain/loader-curtain.component';
import { AuthenticationStoreService } from './shared/services/authentication-store.service';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, finalize } from 'rxjs';
import { AuthenticationRemoteService } from './shared/remotes/authentication-remote.service';
import { CookiesHelperService } from './shared/services/cookies-helper.service';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderCurtainComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  providers: [],
})
export class AppComponent {
  private readonly loaderService = inject(LoaderService);
  private readonly authRemote = inject(AuthenticationRemoteService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cookiesHelper = inject(CookiesHelperService);
  private readonly authStore = inject(AuthenticationStoreService);

  constructor() {
    const loadingId = this.loaderService.addLoading();

    this.authRemote
      .verifyCredentials()
      .pipe(
        tap((response) => {
          const accessToken = this.cookiesHelper.getCookie('accessToken');
          const refreshToken = this.cookiesHelper.getCookie('refreshToken');
          if (refreshToken && accessToken) {
            this.authStore.credentials.set({
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
        }),
        finalize(() => {
          this.loaderService.removeLoading(loadingId);
          this.authStore.authenticationReady.set(true);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
