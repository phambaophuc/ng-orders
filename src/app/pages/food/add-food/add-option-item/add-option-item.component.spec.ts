import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionItemComponent } from './add-option-item.component';

describe('AddOptionItemComponent', () => {
  let component: AddOptionItemComponent;
  let fixture: ComponentFixture<AddOptionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOptionItemComponent]
    });
    fixture = TestBed.createComponent(AddOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
