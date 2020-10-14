import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { PostFeedService } from './post-feed.service';
import { BehaviorSubject } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {
  @Input()
  pageName: BehaviorSubject<string>;
  currentPageName;
  listOfPost = [];
  skip = "0";

  constructor(private postFeedService: PostFeedService,private postService: PostService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageName.subscribe(page => {
      this.currentPageName = page;
      this.listOfPost = [];
      this.skip = "0";
    })
  }
  loadPost() {
    console.log("load post")
    if (this.currentPageName) {
      this.postFeedService.getPostFeed(this.currentPageName, this.skip).subscribe(response => {
        this.listOfPost = [...this.listOfPost, ...response['messageList']];
        this.skip = "" + this.listOfPost.length;
      })
    }
  }
  editHandler(event){
    if(event.type==="DELETE"){ 
      const dialogRef = this.dialog.open(ConfirmationDialogComponent ,{
        data: {
          message: 'are you shure you want delete this message?'
        }});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.postService.remove(event.id).subscribe(res=>{
            this.listOfPost.splice(this.listOfPost.findIndex(el=>el.id===event.id), 1);
          });
        }
      })
      
    }
  }
}
