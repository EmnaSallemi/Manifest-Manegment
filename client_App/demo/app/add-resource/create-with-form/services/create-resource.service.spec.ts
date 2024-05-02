import { CreateResourceService } from './create-resource.service';
import { TestBed } from '@angular/core/testing';


describe('CreateResourceService', () => {
  let service: CreateResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
