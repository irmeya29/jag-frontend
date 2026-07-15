import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations'; // Indispensable pour tester les animations
import { Pole2 } from './pole2';

describe('Pole2', () => {
  let component: Pole2;
  let fixture: ComponentFixture<Pole2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pole2],
      providers: [
        provideAnimations() // Active le support des animations dans le contexte de test
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Pole2);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Force la première détection de changement
    await fixture.whenStable(); // Attend que les animations initiales se stabilisent
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});