import { Component, OnInit, Input,AfterContentInit} from '@angular/core';
import { PostFeedService } from './post-feed.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent  {
  @Input()
  pageName:string;
  listOfPost;

  constructor(private postService:PostFeedService) { }

  ngOnInit(): void {
   this.postService.getPostFeed(this.pageName).subscribe(response=>{
     console.log(this.pageName);
      this.listOfPost=response['messageList'];
   })  
  }

}
