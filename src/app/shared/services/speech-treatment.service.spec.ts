import { TestBed } from '@angular/core/testing';

import { SpeechTreatmentService } from './speech-treatment.service';

describe('SpeechTreatmentService', () => {
  let service: SpeechTreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechTreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
