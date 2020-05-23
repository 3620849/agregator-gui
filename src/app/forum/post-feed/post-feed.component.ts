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
  listOfPost=[];
  skip="0";

  constructor(private postService:PostFeedService) { }

  ngOnInit(): void {
     
  }
  loadPost(){
    this.postService.getPostFeed(this.pageName,this.skip).subscribe(response=>{
      this.listOfPost=[...this.listOfPost,...response['messageList']]; 
      this.skip=""+this.listOfPost.length;
   })
  }

}
