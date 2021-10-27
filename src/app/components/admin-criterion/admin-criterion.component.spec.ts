import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCriterionComponent } from './admin-criterion.component';

describe('AdminCriterionComponent', () => {
  let component: AdminCriterionComponent;
  let fixture: ComponentFixture<AdminCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
