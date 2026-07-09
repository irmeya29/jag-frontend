import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Realisations } from './realisations';

describe('Realisations', () => {
  let component: Realisations;
  let fixture: ComponentFixture<Realisations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Realisations],
    }).compileComponents();

    fixture = TestBed.createComponent(Realisations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
