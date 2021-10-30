import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoresEnactersComponent } from './asesores-enacters.component';

describe('AsesoresEnactersComponent', () => {
  let component: AsesoresEnactersComponent;
  let fixture: ComponentFixture<AsesoresEnactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoresEnactersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoresEnactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
