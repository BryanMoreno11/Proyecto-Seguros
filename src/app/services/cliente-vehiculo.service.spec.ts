import { TestBed } from '@angular/core/testing';

import { ClienteVehiculoService } from './cliente-vehiculo.service';

describe('ClienteVehiculoService', () => {
  let service: ClienteVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
