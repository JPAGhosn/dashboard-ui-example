import { Component, input, output } from '@angular/core';
import { TextfieldComponent } from '../textfield/textfield.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { every } from 'rxjs';

@Component({
  selector: 'app-search-textfield',
  standalone: true,
  imports: [TextfieldComponent, MatProgressSpinner],
  templateUrl: './search-textfield.component.html',
  styleUrl: './search-textfield.component.sass',
})
export class SearchTextfieldComponent {
  valueChange = output<string>();
  loading = input.required();

  onValueChange($event: string) {
    this.valueChange.emit($event);
  }
}
