import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { IconDirective } from '../../directives/icon.directive';
import { IconWrapperComponent } from "../icon-wrapper/icon-wrapper.component";

@Component({
  selector: 'app-count-display-card',
  standalone: true,
  imports: [NgTemplateOutlet, IconWrapperComponent],
  templateUrl: './count-display-card.component.html',
  styleUrl: './count-display-card.component.sass'
})
export class CountDisplayCardComponent {
  value = input.required<number>()
  title = input.required<string>()

  iconTemplate = contentChild.required(IconDirective, {read: TemplateRef<any>})
}
