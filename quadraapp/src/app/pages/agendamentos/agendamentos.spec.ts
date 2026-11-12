import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Agendamentos } from './agendamentos';

describe('Agendamentos', () => {
  let component: Agendamentos;
  let fixture: ComponentFixture<Agendamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agendamentos],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Agendamentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
