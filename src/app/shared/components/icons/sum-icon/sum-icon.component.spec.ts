import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumIconComponent } from './sum-icon.component';

describe('SumIconComponent', () => {
  let component: SumIconComponent;
  let fixture: ComponentFixture<SumIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
