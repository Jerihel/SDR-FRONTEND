import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriterionComponent } from './edit-criterion.component';

describe('EditCriterionComponent', () => {
  let component: EditCriterionComponent;
  let fixture: ComponentFixture<EditCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
