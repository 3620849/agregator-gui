import { TestBed } from '@angular/core/testing';

import { AddNewPostService } from './add-new-post.service';

describe('AddNewPostService', () => {
  let service: AddNewPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
