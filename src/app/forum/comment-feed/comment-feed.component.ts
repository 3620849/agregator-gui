import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.scss']
})
export class CommentFeedComponent implements OnInit {
  testComment={
    userPhoto:'https://sun9-22.userapi.com/c850436/v850436851/3f302/vNHpkKS-Y7w.jpg?ava=1',
    userName:'Derek',
    summary:{like:1,dislike:0},
    content:[{type:"text",text:"Wow! This is very nice post!"}]

  }
  constructor() { }

  ngOnInit(): void {
  }

}
