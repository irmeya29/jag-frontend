import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Hero1 } from './hero1';

describe('Hero1', () => {
  let component: Hero1;
  let fixture: ComponentFixture<Hero1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero1, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
