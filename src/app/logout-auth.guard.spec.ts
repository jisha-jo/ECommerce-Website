import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logoutAuthGuard } from './logout-auth.guard';

describe('logoutAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logoutAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
