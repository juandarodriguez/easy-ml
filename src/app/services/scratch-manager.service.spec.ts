import { TestBed } from '@angular/core/testing';

import { ScratchManagerService } from './scratch-manager.service';

describe('ScratchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScratchManagerService = TestBed.get(ScratchManagerService);
    expect(service).toBeTruthy();
  });
});
