import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monespacejust } from './monespacejust';

describe('Monespacejust', () => {
  let component: Monespacejust;
  let fixture: ComponentFixture<Monespacejust>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monespacejust],
    }).compileComponents();

    fixture = TestBed.createComponent(Monespacejust);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
