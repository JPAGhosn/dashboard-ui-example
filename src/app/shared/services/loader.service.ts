import { computed, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class LoaderService {
  loadingIds = signal<string[]>([]);

  isLoading = computed(() => this.loadingIds().length > 0);

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
      const index = curr.findIndex((loadingId) => loadingId !== id);
      curr.splice(index, 1);
      return [...curr];
    });
  }

  removeLoadingOnFinalize(loadingId: string) {
    return finalize(() => this.removeLoading(loadingId));
  }
}
