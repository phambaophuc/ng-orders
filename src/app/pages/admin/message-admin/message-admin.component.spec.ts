import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAdminComponent } from './message-admin.component';

describe('MessageAdminComponent', () => {
  let component: MessageAdminComponent;
  let fixture: ComponentFixture<MessageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageAdminComponent]
    });
    fixture = TestBed.createComponent(MessageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
