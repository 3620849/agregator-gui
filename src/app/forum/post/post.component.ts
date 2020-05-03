import { Component, OnInit, Input } from '@angular/core';
import { LikeService } from 'src/app/shared/services/like.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post;
  totalLike;
  likeStatus: "like" | "pristine" | "dislike" = "pristine";
  canLike = true;
  canDislike = true;
  constructor(private likeSrv: LikeService) { }

  ngOnInit(): void {
    this.totalLike = this.post.summary.like - this.post.summary.dislike;
  }

  like() {
    if (this.likeStatus === "pristine") {
      this.likeSrv.likeOrDis(this.post.id, "1").subscribe(res => {
        ++this.totalLike;
        this.likeStatus = "like";
      });
    } else {
      this.likeSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        ++this.totalLike;
        ++this.totalLike;
        this.likeStatus = "like";
      });
    }

  }
  dislike() {
    if (this.likeStatus === "pristine") {
      this.likeSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    } else {
      this.likeSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        --this.totalLike;
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    }
  }
}
