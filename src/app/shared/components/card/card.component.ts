import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { DescriptiveIconDirective } from '../../directives/descriptive-icon.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  label = input.required<string>();

  descriptiveIconTemplate = contentChild(DescriptiveIconDirective, { read: TemplateRef<any> });
}
