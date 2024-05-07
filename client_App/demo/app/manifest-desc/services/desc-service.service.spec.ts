import { TestBed } from '@angular/core/testing';

import { DescServiceService } from './desc-service.service';

describe('DescServiceService', () => {
  let service: DescServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
