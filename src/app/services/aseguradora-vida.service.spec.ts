import { TestBed } from '@angular/core/testing';

import { AseguradoraVidaService } from './aseguradora-vida.service';

describe('AseguradorVidaService', () => {
  let service: AseguradoraVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradoraVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
