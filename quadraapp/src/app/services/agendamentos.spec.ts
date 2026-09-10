import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AgendamentosService } from './agendamentos';

describe('AgendamentosService', () => {
  let service: AgendamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AgendamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
