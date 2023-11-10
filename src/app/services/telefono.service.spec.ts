import { TestBed } from '@angular/core/testing';

import { TelefonoService } from './telefono.service';

describe('TelefonoService', () => {
  let service: TelefonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelefonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
