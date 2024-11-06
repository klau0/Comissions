import { TestBed } from '@angular/core/testing';

import { Web3jsService } from './web3js.service';

describe('Web3jsService', () => {
  let service: Web3jsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3jsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
