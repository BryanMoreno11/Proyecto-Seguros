import { TestBed } from '@angular/core/testing';

import { AseguradoraVehiculoService } from './aseguradora-vehiculo.service';

describe('AseguradoraVehiculoService', () => {
  let service: AseguradoraVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradoraVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
