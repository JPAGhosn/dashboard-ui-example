import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationStoreService } from '../shared/services/authentication-store.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    RouterOutlet,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.sass',
})
export class AppLayoutComponent implements OnDestroy {
  isSidebarOpened = signal(false);

  authStore = inject(AuthenticationStoreService);

  closeSidebar = () => {
    this.isSidebarOpened.set(false);
  };

  constructor() {
    document.body.addEventListener('click', this.closeSidebar);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeSidebar);
  }
}
