import { TestBed } from '@angular/core/testing';

import { ColorsLocalService } from './colors-local.service';

describe('ColorsLocalService', () => {
  let service: ColorsLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
