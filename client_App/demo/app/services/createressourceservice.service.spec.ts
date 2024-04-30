import { TestBed } from '@angular/core/testing';

import { CreateressourceserviceService } from './createressourceservice.service';

describe('CreateressourceserviceService', () => {
  let service: CreateressourceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateressourceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
