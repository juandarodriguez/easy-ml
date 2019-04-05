import { TestBed } from '@angular/core/testing';

import { TextClasifyerService } from './text-clasifyer.service';

describe('TextClasifyerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextClasifyerService = TestBed.get(TextClasifyerService);
    expect(service).toBeTruthy();
  });
});
