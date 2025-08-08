import { Component, input } from '@angular/core';
import { Company } from '../../models/company-model';
import { IconWrapperComponent } from "../icon-wrapper/icon-wrapper.component";
import { BuildingIconComponent } from "../icons/building-icon/building-icon.component";

@Component({
  selector: 'app-company-list-item',
  standalone: true,
  imports: [IconWrapperComponent, BuildingIconComponent],
  templateUrl: './company-list-item.component.html',
  styleUrl: './company-list-item.component.sass',
})
export class CompanyListItemComponent {
  company = input.required<Company>();
}
