import { TestBed } from '@angular/core/testing';

import { AnioService } from './anio.service';

describe('AnioService', () => {
  let service: AnioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
