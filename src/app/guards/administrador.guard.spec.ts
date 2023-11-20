import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { administradorGuard } from './administrador.guard';

describe('administradorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => administradorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
