import { TestBed } from '@angular/core/testing';

import { MeteorologiaService } from './meteorologia.service';

describe('MeteorologiaService', () => {
  let service: MeteorologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeteorologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
