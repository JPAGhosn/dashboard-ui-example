import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopIconComponent } from './laptop-icon.component';

describe('LaptopIconComponent', () => {
  let component: LaptopIconComponent;
  let fixture: ComponentFixture<LaptopIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptopIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
