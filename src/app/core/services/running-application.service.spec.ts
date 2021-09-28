import { TestBed } from '@angular/core/testing';

import { RunningApplicationService } from './running-application.service';

describe('RunningApplicationService', () => {
  let service: RunningApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunningApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
