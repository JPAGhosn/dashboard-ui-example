import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextfieldComponent } from '../shared/components/textfield/textfield.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { passwordValidator } from '../shared/validators/password-validator';
import { LoginPayload } from '../shared/payloads/login-payload';
import { AuthenticationRemoteService } from '../shared/remotes/authentication-remote.service';
import { catchError, finalize, tap } from 'rxjs';
import { AuthenticationStoreService } from '../shared/services/authentication-store.service';
import { ErrorResponse } from '../shared/responses/error-response';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextfieldComponent,
    ButtonComponent,
    MatProgressSpinner,
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.sass',
})
export class LoginScreenComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authRemote = inject(AuthenticationRemoteService);
  private readonly authStore = inject(AuthenticationStoreService);
  private readonly router = inject(Router);

  public readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (this.form.invalid) return;

    const payload: LoginPayload = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.isLoading.set(true);
    this.authRemote
      .signIn(payload)
      .pipe(
        tap((response) => {
          this.authStore.setCredentials(response);
          this.router.navigateByUrl('/dashboard');
        }),
        catchError((err: ErrorResponse) => {
          this.errorMessage.set(err.message);
          this.isLoading.set(false);
          throw err;
        })
      )
      .subscribe();
  }
}
