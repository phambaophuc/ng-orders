import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShopComponent } from './list-shop.component';

describe('ListShopComponent', () => {
  let component: ListShopComponent;
  let fixture: ComponentFixture<ListShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListShopComponent]
    });
    fixture = TestBed.createComponent(ListShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
