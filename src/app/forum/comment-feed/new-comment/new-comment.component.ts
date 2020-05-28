import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ElementTextComponent } from '../../add-new-post/element-text/element-text.component';
import { CommentService } from '../comment.service';
import { UserDetailsService } from 'src/app/user-details/user-details.service'; 

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  @Input()
  parent:{parentPostId:string,id:string,comments:any[],ancestorId:string};
  @Output()
  onAdd:EventEmitter<any>=new EventEmitter<any>();
  @Output()
  addPressed:EventEmitter<any>=new EventEmitter<any>();
  data:{text:string}={text:undefined};
  @ViewChild('textEl') textEl:ElementTextComponent;
  constructor(private commentSrv:CommentService,private userService:UserDetailsService) {

   }

  ngOnInit(): void {
  }
  add(){
    if(this.data.text && this.parent.id){ 
      this.userService.getUserDetails().subscribe(details=>{
        let tempComment = {
          userPhoto: details.photo,
          userName: details.login,
          summary: { like: 0, dislike: 0 },
          content: [
            {
              type: "text",
              text: this.data.text
            }],
          comments: []}
          //if there is no ancestorId parent is post
          if(!this.parent.ancestorId){
            this.onAdd.emit(tempComment);
          }else{
            if(!this.parent.comments){
              this.parent.comments=[];
            }
            this.parent.comments.unshift(tempComment);
          }
         
      })
      let payload = [{text:this.data.text,type:"text"}]; 
      if(!this.parent.parentPostId){
        this.parent.parentPostId=this.parent.id;
      }
      this.commentSrv.addNewComment(this.parent.parentPostId,this.parent.id,payload)      
      this.textEl.cleanField();
    }
    this.addPressed.emit();
  }
  

}
