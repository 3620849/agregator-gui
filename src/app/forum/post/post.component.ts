import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';  

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post;
  @Input()
  mode;
  totalLike;
  likeStatus: "like" | "pristine" | "dislike" = "pristine";
  canLike = true;
  canDislike = true;
  content
  @Output()
  editEvent:EventEmitter<any>=new EventEmitter<any>();
  constructor(private postSrv: PostService) { }

  ngOnInit(): void {
    this.totalLike = this.post.summary.like - this.post.summary.dislike;
    this.content=this.post.shortContent;
    if(this.mode==='full'){
      this.content=this.post.content;
    }
  }

  like() {
    if (this.likeStatus === "pristine") {
      this.postSrv.likeOrDis(this.post.id, "1").subscribe(res => {
        ++this.totalLike;
        this.likeStatus = "like";
      });
    } else {
      this.postSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        ++this.totalLike;
        ++this.totalLike;
        this.likeStatus = "like";
      });
    }

  }
  dislike() {
    if (this.likeStatus === "pristine") {
      this.postSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    } else {
      this.postSrv.likeOrDis(this.post.id, "-1").subscribe(res => {
        --this.totalLike;
        --this.totalLike;
        this.likeStatus = "dislike";
      });
    }
  }
  remove(id){
    this.editEvent.emit({type:"DELETE",id:id})
    
  } 
}
