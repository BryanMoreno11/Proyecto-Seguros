import { TestBed } from '@angular/core/testing';

import { PlanVidaService } from './plan-vida.service';

describe('PlanVidaService', () => {
  let service: PlanVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
