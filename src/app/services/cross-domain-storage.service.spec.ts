import { TestBed } from '@angular/core/testing';

import { CrossDomainStorageService } from './cross-domain-storage.service';

describe('CrossDomainStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrossDomainStorageService = TestBed.get(CrossDomainStorageService);
    expect(service).toBeTruthy();
  });
});
