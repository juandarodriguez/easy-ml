import { TestBed } from '@angular/core/testing';

import { InputLabeledTextManagerService } from './input-labeled-text-manager.service';

describe('InputLabeledTextManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputLabeledTextManagerService = TestBed.get(InputLabeledTextManagerService);
    expect(service).toBeTruthy();
  });
});
