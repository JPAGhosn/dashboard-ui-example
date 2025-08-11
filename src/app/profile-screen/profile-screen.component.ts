import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { AuthenticationStoreService } from '../shared/services/authentication-store.service';
import { Router } from '@angular/router';
import { CookiesHelperService } from '../shared/services/cookies-helper.service';

@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './profile-screen.component.html',
  styleUrl: './profile-screen.component.sass',
})
export class ProfileScreenComponent {
  public readonly authenticationStore = inject(AuthenticationStoreService);
  public readonly router = inject(Router);
  public readonly cookiesService = inject(CookiesHelperService);

  onLogoutClick() {
    this.authenticationStore.credentials.set(null);
    this.cookiesService.removeCookie("accessToken")
    this.cookiesService.removeCookie("refreshToken")
    this.router.navigateByUrl('/login');
  }
} 
