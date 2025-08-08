import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTextfieldComponent } from './search-textfield.component';

describe('SearchTextfieldComponent', () => {
  let component: SearchTextfieldComponent;
  let fixture: ComponentFixture<SearchTextfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTextfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
