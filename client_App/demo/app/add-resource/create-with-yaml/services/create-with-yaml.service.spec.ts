import { TestBed } from '@angular/core/testing';

import { CreateWithYamlService } from './create-with-yaml.service';

describe('CreateWithYamlService', () => {
  let service: CreateWithYamlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateWithYamlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
