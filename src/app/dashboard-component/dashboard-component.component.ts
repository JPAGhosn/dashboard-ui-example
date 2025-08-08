import {
  Component,
  computed,
  DestroyRef,
  HostBinding,
  inject,
  signal,
} from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { SectionComponent } from '../shared/components/section/section.component';
import { CountDisplayCardComponent } from '../shared/components/count-display-card/count-display-card.component';
import { IconDirective } from '../shared/directives/icon.directive';
import { BuildingIconComponent } from '../shared/components/icons/building-icon/building-icon.component';
import { HouseIconComponent } from '../shared/components/icons/house-icon/house-icon.component';
import { LaptopIconComponent } from '../shared/components/icons/laptop-icon/laptop-icon.component';
import { WifiIconComponent } from '../shared/components/icons/wifi-icon/wifi-icon.component';
import {
  catchError,
  finalize,
  forkJoin,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { AccountsRemoteService } from '../shared/remotes/accounts-remote.service';
import { CompaniesRemoteService } from '../shared/remotes/companies-remote.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersRemoteService } from '../shared/remotes/users-remote.service';
import { Action } from '../shared/models/action-model';
import { ActionListItemComponent } from '../shared/components/action-list-item/action-list-item.component';
import { ActionsRemoteService } from '../shared/remotes/actions-remote.service';
import { Company } from '../shared/models/company-model';
import { CompanyListItemComponent } from '../shared/components/company-list-item/company-list-item.component';
import { StorageIconComponent } from '../shared/components/icons/storage-icon/storage-icon.component';
import { DescriptiveIconDirective } from '../shared/directives/descriptive-icon.directive';
import { SumIconComponent } from '../shared/components/icons/sum-icon/sum-icon.component';
import { SkeletonComponent } from '../shared/components/skeleton/skeleton.component';
import { ActionIconDirective } from '../shared/directives/action-icon.directive';
import { TextfieldComponent } from '../shared/components/textfield/textfield.component';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [
    CardComponent,
    SectionComponent,
    CountDisplayCardComponent,
    IconDirective,
    BuildingIconComponent,
    HouseIconComponent,
    LaptopIconComponent,
    WifiIconComponent,
    ActionListItemComponent,
    CompanyListItemComponent,
    ActionIconDirective,
    StorageIconComponent,
    DescriptiveIconDirective,
    SumIconComponent,
    SkeletonComponent,
    TextfieldComponent,
    MatProgressSpinner,
  ],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.sass',
  providers: [
    AccountsRemoteService,
    CompaniesRemoteService,
    UsersRemoteService,
    ActionsRemoteService,
  ],
  host: {
    '[style.overflow-y]': 'scrollState()',
  },
})
export class DashboardComponentComponent {
  private readonly accountsRemote = inject(AccountsRemoteService);
  private readonly companiesRemote = inject(CompaniesRemoteService);
  private readonly usersRemote = inject(UsersRemoteService);
  private readonly actionsRemote = inject(ActionsRemoteService);
  private readonly destroyRef = inject(DestroyRef);

  totalCompaniesCount = signal<number | null>(null);
  pendingCompaniesCount = signal<number | null>(null);
  approvedCompaniesCount = signal<number | null>(null);

  totalAccountsCount = signal<number | null>(null);
  pendingAccountsCount = signal<number | null>(null);
  approvedAccountsCount = signal<number | null>(null);

  totalCorporateUsersCount = signal(0);
  totalBankUsersCount = signal(0);
  corporateOnlineUsers = signal(0);
  bankOnlineUsers = signal(0);

  lastActions = signal<Action[]>([]);
  lastOnboardedCompanies = signal<Company[]>([]);

  initialized = signal(false);

  scrollState = computed(() => (this.initialized() ? 'auto' : 'hidden'));

  lastActionsSearchValue = signal('');

  lastActionsSearchChange$ = new Subject<void>();
  lastActionSearchLoading = signal(false);

  constructor() {
    forkJoin({
      totalCompaniesCount: this.getTotalCompaniesCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      pendingCompaniesCount: this.getPendingCompaniesCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      approvedCompaniesCount: this.getApprovedCompaniesCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      totalAccountsCount: this.getTotalAccountsCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      pendingAccountsCount: this.getPendingAccountsCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      approvedAccountsCount: this.getApprovedAccountsCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      totalCorporateUsersCount: this.getTotalCorporateUsersCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      totalBankUsers: this.getTotalBankUsersCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      corporateOnlineUsers: this.getCorporateOnlineUsersCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      bankOnlineUsers: this.getBankOnlineUsersCount().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      lastActions: this.getLastActions().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
      lastOnboardedCompanies: this.getLastOnboardedCompanies().pipe(
        catchError((err) => {
          return of(null);
        })
      ),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.initialized.set(true))
      )
      .subscribe();
  }

  // Companies
  getTotalCompaniesCount() {
    return this.companiesRemote
      .getTotalCount()
      .pipe(tap((count) => this.totalCompaniesCount.set(count)));
  }

  getPendingCompaniesCount() {
    return this.companiesRemote
      .getPendingCount()
      .pipe(tap((count) => this.pendingCompaniesCount.set(count)));
  }

  getApprovedCompaniesCount() {
    return this.companiesRemote
      .getApprovedCount()
      .pipe(tap((count) => this.approvedCompaniesCount.set(count)));
  }

  // Accounts
  getTotalAccountsCount() {
    return this.accountsRemote
      .getTotalCount()
      .pipe(tap((count) => this.totalAccountsCount.set(count)));
  }

  getPendingAccountsCount() {
    return this.accountsRemote
      .getPendingCount()
      .pipe(tap((count) => this.pendingAccountsCount.set(count)));
  }

  getApprovedAccountsCount() {
    return this.accountsRemote
      .getApprovedCount()
      .pipe(tap((count) => this.approvedAccountsCount.set(count)));
  }

  getTotalCorporateUsersCount() {
    return this.usersRemote
      .getTotalCorporateUsersCount()
      .pipe(tap((count) => this.totalCorporateUsersCount.set(count)));
  }

  getTotalBankUsersCount() {
    return this.usersRemote
      .getTotalBankUsersCount()
      .pipe(tap((count) => this.totalBankUsersCount.set(count)));
  }

  getCorporateOnlineUsersCount() {
    return this.usersRemote
      .getCorporateOnlineUsersCount()
      .pipe(tap((count) => this.corporateOnlineUsers.set(count)));
  }

  getBankOnlineUsersCount() {
    return this.usersRemote
      .getBankOnlineUsersCount()
      .pipe(tap((count) => this.bankOnlineUsers.set(count)));
  }

  getLastActions() {
    return this.actionsRemote
      .getActions({
        pageNumber: 1,
        pageSize: 3,
        filter: this.lastActionsSearchValue(),
      })
      .pipe(
        tap((response) => {
          this.lastActions.set(response.data);
        })
      );
  }

  getLastOnboardedCompanies() {
    return this.companiesRemote
      .getOnboardedCompanies({
        pageNumber: 1,
        pageSize: 3,
      })
      .pipe(
        tap((response) => {
          this.lastOnboardedCompanies.set(response.data);
        })
      );
  }

  onTotalCompaniesActionIconClick() {
    alert('Total companies action button clicked');
  }

  onLastActionValueChange(value: string) {
    this.lastActionsSearchChange$.next();
    this.lastActionSearchLoading.set(true);

    // usually better to wrap with a timer
    this.getLastActions()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.lastActionsSearchChange$),
        finalize(() => this.lastActionSearchLoading.set(false))
      )
      .subscribe();
  }
}
