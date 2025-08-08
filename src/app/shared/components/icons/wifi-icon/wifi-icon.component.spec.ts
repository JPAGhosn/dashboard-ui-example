import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiIconComponent } from './wifi-icon.component';

describe('WifiIconComponent', () => {
  let component: WifiIconComponent;
  let fixture: ComponentFixture<WifiIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WifiIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WifiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
