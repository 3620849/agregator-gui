import { TestBed } from '@angular/core/testing';

import { TimeContorlService } from './time-contorl.service';

describe('TimeContorlService', () => {
  let service: TimeContorlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeContorlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
