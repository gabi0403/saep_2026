import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuadrasService } from './quadras';

describe('QuadrasService', () => {
  let service: QuadrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(QuadrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
