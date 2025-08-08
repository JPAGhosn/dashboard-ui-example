import { Component, input, model, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.sass',
})
export class TextfieldComponent implements ControlValueAccessor {
  value = model<string>('');
  label = input.required<string>();
  placeholder = input.required<string>();
  errorMap = input<Record<string, string>>({});

  onChange = (v: string) => {};
  onTouched = () => {};

  _formControl = new FormControl();

  get control() {
    return (this.ngControl?.control ??
      this._formControl) as FormControl<string>;
  }

  get errorMessage() {
    const key = Object.keys(this.control.errors ?? {}).at(0);
    if (key) {
      return this.errorMap()[key];
    }
    return '';
  }

  constructor(
    @Optional()
    @Self()
    private readonly ngControl?: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInput($event: any) {
    const value = $event.target.value;
    this.value.set(value);
    this.onChange(value);
  }
}
