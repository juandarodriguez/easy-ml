import { TestBed } from '@angular/core/testing';

import { TextClassifierService } from './text-clasifyer.service';

describe('TextClassifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextClassifierService = TestBed.get(TextClassifierService);
    expect(service).toBeTruthy();
  });
});
