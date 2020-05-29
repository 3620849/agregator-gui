import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './comment.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.scss']
})
export class CommentFeedComponent implements OnInit {
  @Input()
  post;
  comments = [];
  constructor(private commentSrv:CommentService) { }

  ngOnInit(): void {
    this.commentSrv.getCommentsTree(this.post['id']).subscribe(res=>{
       
      this.comments=res['messageList'];
    });
  }
  addToComments(event){
    this.comments.unshift(event);
  }
   
}
