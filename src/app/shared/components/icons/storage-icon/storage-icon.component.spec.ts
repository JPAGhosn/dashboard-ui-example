import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageIconComponent } from './storage-icon.component';

describe('StorageIconComponent', () => {
  let component: StorageIconComponent;
  let fixture: ComponentFixture<StorageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
