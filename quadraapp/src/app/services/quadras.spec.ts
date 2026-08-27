import { TestBed } from '@angular/core/testing';
import { Quadras } from './quadras';

describe('Quadras', () => {
  let service: Quadras;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quadras);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
