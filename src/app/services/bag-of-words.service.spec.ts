import { TestBed } from '@angular/core/testing';

import { BagOfWordsService } from './bag-of-words.service';

describe('BagOfWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BagOfWordsService = TestBed.get(BagOfWordsService);
    expect(service).toBeTruthy();
  });
});
