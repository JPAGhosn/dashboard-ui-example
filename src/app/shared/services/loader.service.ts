import { computed, Injectable, signal } from '@angular/core';
import { finalize, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class LoaderService {
  loadingIds = signal<string[]>([]);
  navigationLoading = signal(false);

  isLoading = computed(() => {
    return this.navigationLoading() || this.loadingIds().length > 0;
  });

  constructor() {}

  addLoading() {
    const id = v4();
    this.loadingIds.update((curr) => {
      return [...curr, id];
    });

    return id;
  }

  removeLoading(id: string) {
    this.loadingIds.update((curr) => {
      const filtered = curr.filter((loadingId) => loadingId !== id);
      return [...filtered];
    });
  }

  removeLoadingOnFinalize<T>(loadingId: string): MonoTypeOperatorFunction<T> {
    return finalize(() => {
      return this.removeLoading(loadingId);
    });
  }

  removeNavigationLoading() {
    this.navigationLoading.set(false);
  }

  addNavigationLoading() {
    this.navigationLoading.set(true);
  }
}
