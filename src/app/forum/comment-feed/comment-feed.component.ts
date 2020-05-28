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
  comments = [{
    id:1,
    parentPostId:123,
    userPhoto: 'https://sun9-22.userapi.com/c850436/v850436851/3f302/vNHpkKS-Y7w.jpg?ava=1',
    userName: 'Derek',
    summary: { like: 1, dislike: 0 },
    content: [
      {
        type: "text",
        text: "Nice post!"
      }],
    comments: [
      {
        userPhoto: 'https://sun9-22.userapi.com/c850436/v850436851/3f302/vNHpkKS-Y7w.jpg?ava=1',
        userName: 'Derek',
        summary: { like: 1, dislike: 0 },
        content: [
          {
            type: "text",
            text: "Nice comment!"
          }]
      }

    ]
  }];
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
