import { Component, OnInit,Input } from '@angular/core';
import { LikeService } from 'src/app/shared/services/like.service';

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
  

  constructor(private likeSrv: LikeService) { }

  ngOnInit(): void {
    this.totalLike = this.comment.summary.like - this.comment.summary.dislike; 
  }

  like() {
    if (this.likeStatus === "pristine") {
      this.likeSrv.likeOrDis(this.comment.id, "1").subscribe(res => {
        ++this.totalLike;
        this.likeStatus = "like";
      });
    } else {
      this.likeSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        ++this.totalLike;
        ++this.totalLike;
        this.likeStatus = "like";
      });
    }

  }
  dislike() {
    if (this.likeStatus === "pristine") {
      this.likeSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    } else {
      this.likeSrv.likeOrDis(this.comment.id, "-1").subscribe(res => {
        --this.totalLike;
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    }
  }

}
