import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Signal,
  untracked,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { UserCreatePayload } from '../../shared/payloads/user-create-payload';
import { UsersRemoteService } from '../../shared/remotes/users-remote.service';
import { passwordValidator } from '../../shared/validators/password-validator';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextfieldComponent } from '../../shared/components/textfield/textfield.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  takeUntil,
  tap,
} from 'rxjs';
import { User } from '../../shared/models/user-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextfieldComponent,
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.sass',
  providers: [UsersRemoteService],
})
export class UsersFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersRemote = inject(UsersRemoteService);
  private readonly route = inject(ActivatedRoute);
  private readonly snackbar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loader = inject(LoaderService);
  private readonly router = inject(Router);

  private readonly userId = toSignal(
    this.route.paramMap.pipe(map((paramMap) => paramMap.get('userId')))
  );

  private readonly mode = computed(() => {
    const userId = this.userId();
    if (userId) {
      return 'edit';
    } else {
      return 'create';
    }
  });

  public readonly submitText = computed(() => {
    if (this.mode() === 'create') {
      return 'Create User';
    } else if (this.mode() === 'edit') {
      return 'Update User';
    }
    throw 'submitText not handled properly';
  });

  public readonly upsertForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
    roles: this.fb.array([this.fb.control('', [Validators.required])]),
  });

  public readonly roles = toSignal<unknown[]>(
    this.upsertForm.controls.roles.valueChanges.pipe(
      distinctUntilChanged((prev, curr) => {
        return prev.length === curr.length;
      })
    )
  );

  constructor() {
    this.upsertForm.valueChanges.pipe(
      tap((v) => {
        console.log(v);
      })
    );

    effect(() => {
      const userId = this.userId();

      untracked(() => {
        if (userId) {
          const loadingId = this.loader.addLoading();
          this.usersRemote
            .getUserById(userId)
            .pipe(
              tap((user) => {
                this.upsertForm.patchValue({
                  fullName: user.fullName,
                  email: user.email,
                  password: '********',
                });

                this.upsertForm.controls.roles.setValue(user.roles);
              }),
              finalize(() => this.loader.removeLoading(loadingId))
            )
            .subscribe();
        }
      });
    });
  }

  onSubmit() {
    if (this.upsertForm.invalid) {
      return;
    }

    const payload: UserCreatePayload = {
      id: !!this.userId() ? this.userId()! : v4(),
      fullName: this.upsertForm.value.fullName!,
      email: this.upsertForm.value.email!,
      password: this.upsertForm.value.password!,
      roles: this.upsertForm.value.roles! as string[],
    };

    let request: Observable<User>;
    if (this.mode() === 'create') {
      request = this.usersRemote.createUser(payload);
    } else {
      request = this.usersRemote.updateUser(payload);
    }

    const loadingId = this.loader.addLoading();
    request
      .pipe(
        tap((user) => {
          if (this.mode() === 'create') {
            this.snackbar.open('User created successfully', 'close');
            this.router.navigateByUrl(`/users/${user.id}`);
          } else {
            this.snackbar.open('User updated successfully', 'close');
          }
        }),
        catchError((err) => {
          this.snackbar.open(err, 'close');
          throw err;
        }),
        finalize(() => this.loader.removeLoading(loadingId)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onAddRoleClicked() {
    // get last field and check if it is valid
    const lastFieldControl =
      this.upsertForm.controls.roles.controls[
        this.upsertForm.controls.roles.controls.length - 1
      ];
    if (lastFieldControl && lastFieldControl.invalid) {
      return;
    }

    this.upsertForm.controls.roles.push(
      this.fb.control('', [Validators.required])
    );
  }
}
