import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCurtainComponent } from './loader-curtain.component';

describe('LoaderCurtainComponent', () => {
  let component: LoaderCurtainComponent;
  let fixture: ComponentFixture<LoaderCurtainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderCurtainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderCurtainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
