import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnacterComponent } from './form-enacter.component';

describe('FormEnacterComponent', () => {
  let component: FormEnacterComponent;
  let fixture: ComponentFixture<FormEnacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEnacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEnacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
