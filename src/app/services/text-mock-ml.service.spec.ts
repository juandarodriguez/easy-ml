import { TestBed } from '@angular/core/testing';

import { TextMockMlService } from './text-mock-ml.service';

describe('TextMockMlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextMockMlService = TestBed.get(TextMockMlService);
    expect(service).toBeTruthy();
  });
});
