import { TestBed } from '@angular/core/testing';

import { SpeechDetectionService } from './speech-detection.service';

describe('SpeechDetectionService', () => {
  let service: SpeechDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
