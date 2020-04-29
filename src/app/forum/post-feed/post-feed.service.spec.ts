import { TestBed } from '@angular/core/testing';

import { PostFeedService } from './post-feed.service';

describe('PostFeedService', () => {
  let service: PostFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
