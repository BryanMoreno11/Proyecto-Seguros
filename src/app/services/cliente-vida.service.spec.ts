import { TestBed } from '@angular/core/testing';

import { ClienteVidaService } from './cliente-vida.service';

describe('ClienteVidaService', () => {
  let service: ClienteVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
