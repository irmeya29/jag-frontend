import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pole1 } from './pole1';

describe('Pole1', () => {
  let component: Pole1;
  let fixture: ComponentFixture<Pole1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pole1],
    }).compileComponents();

    fixture = TestBed.createComponent(Pole1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
