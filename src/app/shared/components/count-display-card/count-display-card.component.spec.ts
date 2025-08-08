import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDisplayCardComponent } from './count-display-card.component';

describe('CountDisplayCardComponent', () => {
  let component: CountDisplayCardComponent;
  let fixture: ComponentFixture<CountDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountDisplayCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
