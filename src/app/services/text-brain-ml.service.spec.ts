import { TestBed } from '@angular/core/testing';

import { TextBrainMLService } from './text-brain-ml.service';

describe('BrainMLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextBrainMLService = TestBed.get(TextBrainMLService);
    expect(service).toBeTruthy();
  });
});
