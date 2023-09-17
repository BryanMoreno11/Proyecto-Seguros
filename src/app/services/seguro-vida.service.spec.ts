import { TestBed } from '@angular/core/testing';

import { SeguroVidaService } from './seguro-vida.service';

describe('SeguroVidaService', () => {
  let service: SeguroVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguroVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
