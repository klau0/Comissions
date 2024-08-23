import { TestBed } from '@angular/core/testing';

import { Web3storageService } from './web3storage.service';

describe('Web3storageService', () => {
  let service: Web3storageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3storageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
