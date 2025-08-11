import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../shared/models/user-model';
import { UsersRemoteService } from '../../shared/remotes/users-remote.service';
import { PaginationPayload } from '../../shared/payloads/pagination-payload';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SearchTextfieldComponent } from '../../shared/components/search-textfield/search-textfield.component';
import { LoaderService } from '../../shared/services/loader.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogComponent,
  DialogDataModel,
  DialogResponseModel,
} from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    DatePipe,
    MatPaginator,
    SearchTextfieldComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SkeletonComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.sass',
  providers: [UsersRemoteService],
})
export class UsersListComponent {
  private readonly usersRemote = inject(UsersRemoteService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);
  private readonly loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly dialog = inject(MatDialog);

  pageNumber = toSignal(
    this.route.queryParamMap.pipe(
      map((paramMap) => {
        const pageNumberString = paramMap.get('pageNumber')!;
        return Math.max(1, +pageNumberString);
      })
    )
  );

  filter = toSignal(
    this.route.queryParamMap.pipe(
      map((paramMap) => paramMap.get('filter') ?? '')
    )
  );

  sortColumn = toSignal(
    this.route.queryParamMap.pipe(
      map((paramMap) => paramMap.get('sortColumn') ?? '')
    )
  );

  sortDirection = toSignal(
    this.route.queryParamMap.pipe(
      map((paramMap) => {
        const direction = paramMap.get('sortDirection');

        if (direction && ['asc', 'desc', ''].includes(direction)) {
          return direction as SortDirection;
        }

        return '';
      })
    )
  );

  public readonly dataSource = new MatTableDataSource<User>([]);

  pagination = computed(() => {
    return {
      pageNumber: this.pageNumber() ?? 1,
      pageSize: 15,
      filter: this.filter() ?? '',
      sort: {
        active: this.sortColumn() ?? '',
        direction: this.sortDirection() ?? '',
      },
    } satisfies PaginationPayload;
  });

  totalRecords = signal(0);

  displayedColumns = [
    'fullName',
    'email',
    'lastLogin',
    'edit-icon',
    'delete-icon',
  ];

  isSearchLoading = signal(false);
  isDataLoading = signal(true);
  search$ = new Subject<void>();

  dummyArray = signal(Array.from(Array(30).keys()));

  constructor() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageNumber: this.pageNumber(),
        filter: this.route.snapshot.paramMap.get('filter') ?? '',
        sortColumn: this.sortColumn(),
        sortDirection: this.sortDirection(),
      },
      queryParamsHandling: 'merge',
    });

    this.getUsers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.snackBar.open('Error while trying to fetch the users', 'close');
          throw err;
        }),
        finalize(() => this.isDataLoading.set(false))
      )
      .subscribe({
        complete: () => {
          console.log('Completed');
        },
      });
  }

  getUsers() {
    return this.usersRemote.getUsers(this.pagination()).pipe(
      tap((response) => {
        this.dataSource.data = response.data;
        this.totalRecords.set(response.totalRecords);
      })
    );
  }

  async onSearchChange($event: string) {
    this.search$.next();
    this.isSearchLoading.set(true);

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: $event, pageNumber: 1 },
      queryParamsHandling: 'merge',
    });

    timer(300)
      .pipe(
        switchMap((_) => {
          return this.getUsers().pipe();
        }),
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.search$),
        catchError((err) => {
          this.snackBar.open('Error while trying to fetch the users', 'close');
          throw err;
        }),
        finalize(() => this.isSearchLoading.set(false))
      )
      .subscribe();
  }

  async onPageChange($event: PageEvent) {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pageNumber: $event.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });

    this.isDataLoading.set(true);
    return this.getUsers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.snackBar.open('Error while trying to fetch the users', 'close');
          throw err;
        }),
        finalize(() => this.isDataLoading.set(false))
      )
      .subscribe();
  }

  onDelete(userId: any) {
    this.dialog
      .open(DialogComponent, {
        width: '100vw',
        minWidth: '300px',
        maxWidth: '500px',
        data: {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this user?',
        } satisfies DialogDataModel,
      })
      .afterClosed()
      .pipe(
        switchMap((response: DialogResponseModel) => {
          if (response === 'no') {
            return EMPTY;
          }

          const loaderId = this.loaderService.addLoading();
          return this.usersRemote.deleteUserById(userId).pipe(
            tap((response) => {
              this.snackBar.open('User deleted successfully', 'close');
            }),
            switchMap(() => {
              return this.getUsers();
            }),
            finalize(() => this.loaderService.removeLoading(loaderId))
          );
        }),
        catchError((err) => {
          this.snackBar.open(err, 'close');
          throw err;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  async onSort($event: Sort) {
    const loadingId = this.loaderService.addLoading();

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageNumber: 1,
        sortColumn: $event.active,
        sortDirection: $event.direction,
      },
      queryParamsHandling: 'merge',
    });

    this.search$.next();

    this.getUsers()
      .pipe(
        catchError((err) => {
          this.snackBar.open(err, 'close');
          throw err;
        }),
        finalize(() => this.loaderService.removeLoading(loadingId)),
        takeUntil(this.search$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
