import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDotsComponent } from './loading-dots.component';

describe('LoadingDotsComponent', () => {
  let component: LoadingDotsComponent;
  let fixture: ComponentFixture<LoadingDotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDotsComponent]
    });
    fixture = TestBed.createComponent(LoadingDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
