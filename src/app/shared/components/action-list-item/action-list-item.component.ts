import { Component, computed, inject, input } from '@angular/core';
import { Action } from '../../models/action-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-action-list-item',
  standalone: true,
  imports: [],
  templateUrl: './action-list-item.component.html',
  styleUrl: './action-list-item.component.sass',
  providers: [DatePipe],
})
export class ActionListItemComponent {
  datePipe = inject(DatePipe);

  action = input.required<Action>();

  date = computed(() => {
    return this.datePipe.transform(this.action().date, 'MM/dd/yyyy h:mm:ss a');
  });
}
