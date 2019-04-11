import { TestBed } from '@angular/core/testing';

import { ShowProgressSpinnerService } from './show-progress-spinner.service';

describe('ShowProgressSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowProgressSpinnerService = TestBed.get(ShowProgressSpinnerService);
    expect(service).toBeTruthy();
  });
});
