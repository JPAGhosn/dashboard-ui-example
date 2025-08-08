import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { UserCreatePayload } from '../../shared/payloads/user-create-payload';
import { UsersRemoteService } from '../../shared/remotes/users-remote.service';
import { passwordValidator } from '../../shared/validators/password-validator';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextfieldComponent } from '../../shared/components/textfield/textfield.component';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextfieldComponent, ButtonComponent],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.sass',
  providers: [UsersRemoteService],
})
export class UsersFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersRemote = inject(UsersRemoteService);

  public readonly upsertForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });

  onSubmit() {
    if (this.upsertForm.invalid) {
      return;
    }

    const payload: UserCreatePayload = {
      id: v4(),
      fullName: '',
      email: '',
      password: '',
    };

    // this.usersRemote.createUser(payload);
  }
}
