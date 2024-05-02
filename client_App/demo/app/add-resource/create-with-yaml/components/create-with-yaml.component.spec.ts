import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWithYamlComponent } from './create-with-yaml.component';

describe('CreateWithYamlComponent', () => {
  let component: CreateWithYamlComponent;
  let fixture: ComponentFixture<CreateWithYamlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWithYamlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWithYamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
