import { TestBed } from '@angular/core/testing';

import { SeguroVehiculoService } from './seguro-vehiculo.service';

describe('SeguroVehiculoService', () => {
  let service: SeguroVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguroVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
