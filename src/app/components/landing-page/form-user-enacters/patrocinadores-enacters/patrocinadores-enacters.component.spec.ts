import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadoresEnactersComponent } from './patrocinadores-enacters.component';

describe('PatrocinadoresEnactersComponent', () => {
  let component: PatrocinadoresEnactersComponent;
  let fixture: ComponentFixture<PatrocinadoresEnactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrocinadoresEnactersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrocinadoresEnactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
