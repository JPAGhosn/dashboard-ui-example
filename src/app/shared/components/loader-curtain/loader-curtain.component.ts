import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-curtain',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loader-curtain.component.html',
  styleUrl: './loader-curtain.component.sass',
})
export class LoaderCurtainComponent {
  loaderService = inject(LoaderService);
}
