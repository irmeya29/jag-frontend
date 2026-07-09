import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notreprocessus } from './notreprocessus';

describe('Notreprocessus', () => {
  let component: Notreprocessus;
  let fixture: ComponentFixture<Notreprocessus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notreprocessus],
    }).compileComponents();

    fixture = TestBed.createComponent(Notreprocessus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
