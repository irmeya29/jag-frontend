import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pole2 } from './pole2';

describe('Pole2', () => {
  let component: Pole2;
  let fixture: ComponentFixture<Pole2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pole2],
    }).compileComponents();

    fixture = TestBed.createComponent(Pole2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
