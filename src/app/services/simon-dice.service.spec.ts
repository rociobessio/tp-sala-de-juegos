import { TestBed } from '@angular/core/testing';

import { SimonDiceService } from './simon-dice.service';

describe('SimonDiceService', () => {
  let service: SimonDiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimonDiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
