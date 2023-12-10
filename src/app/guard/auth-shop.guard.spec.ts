import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authShopGuard } from './auth-shop.guard';

describe('authShopGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authShopGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
