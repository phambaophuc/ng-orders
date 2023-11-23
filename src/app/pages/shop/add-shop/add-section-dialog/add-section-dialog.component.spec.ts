import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionDialogComponent } from './add-section-dialog.component';

describe('AddSectionDialogComponent', () => {
  let component: AddSectionDialogComponent;
  let fixture: ComponentFixture<AddSectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSectionDialogComponent]
    });
    fixture = TestBed.createComponent(AddSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
