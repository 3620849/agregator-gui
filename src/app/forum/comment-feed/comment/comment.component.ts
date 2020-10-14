import { Component, OnInit,Input } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment;
  totalLike;
  likeStatus: "like" | "pristine" | "dislike" = "pristine";
  canLike = true;
  canDislike = true;
  showSubComment=true;
  answer=false;
  

  constructor(private postSrv: PostService) { }

  ngOnInit(): void {
    this.totalLike = this.comment.summary.like - this.comment.summary.dislike; 
  }

  like() {
    if (this.likeStatus === "pristine") {
      this.postSrv.likeOrDis(this.comment.id, "1").subscribe(res => {
        ++this.totalLike;
        this.likeStatus = "like";
      });
    } else {
      this.postSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        ++this.totalLike;
        ++this.totalLike;
        this.likeStatus = "like";
      });
    }

  }
  dislike() {
    if (this.likeStatus === "pristine") {
      this.postSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    } else {
      this.postSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        --this.totalLike;
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    }
  }
  toggleSub(){
    this.showSubComment=!this.showSubComment;
  }
  toggleAns(){
    this.answer=!this.answer;
  }
  
}
