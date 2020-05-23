import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostFeedService } from '../post-feed/post-feed.service';

@Component({
  selector: 'app-expanded-post',
  templateUrl: './expanded-post.component.html',
  styleUrls: ['./expanded-post.component.scss']
})
export class ExpandedPostComponent implements OnInit {
  private subscription: Subscription;
  id:string;
  message;
  constructor(private activateRoute: ActivatedRoute,private postService:PostFeedService){
          
}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.postService.getMessageByIds({idsList:[this.id]}).subscribe(list=>{
        this.message=list['messageList'][0];
      });
    });
  }

}
