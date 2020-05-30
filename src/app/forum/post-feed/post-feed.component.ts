import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { PostFeedService } from './post-feed.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {
  @Input()
  pageName: BehaviorSubject<string>;
  currentPageName;
  listOfPost = [];
  skip = "0";

  constructor(private postService: PostFeedService) { }

  ngOnInit(): void {
    this.pageName.subscribe(page => {
       
      this.currentPageName = page;
      this.listOfPost = [];
      this.skip = "0";
      //this.loadPost();
    })
  }
  loadPost() {
    console.log("load post")
    if (this.currentPageName) {
      this.postService.getPostFeed(this.currentPageName, this.skip).subscribe(response => {
        this.listOfPost = [...this.listOfPost, ...response['messageList']];
        this.skip = "" + this.listOfPost.length;
      })
    }
  }

}
