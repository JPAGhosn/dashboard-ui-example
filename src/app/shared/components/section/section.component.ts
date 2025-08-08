import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { ActionIconDirective } from '../../directives/action-icon.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './section.component.html',
  styleUrl: './section.component.sass',
})
export class SectionComponent {
  title = input('');

  rightIconTemplate = contentChild(ActionIconDirective, {
    read: TemplateRef<any>,
  });
}
