import { Component, OnInit } from '@angular/core';
import { PostFeedService } from '../post-feed/post-feed.service';
import { UserDetailsService } from 'src/app/user-details/user-details.service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  skip=0;
  listOfMessage=[];
  userId;
  constructor(private postService:PostFeedService,private userService:UserDetailsService) { }

  ngOnInit(): void {
     
    this.userService.getUserDetails().pipe(take(2)).subscribe(details=>{
      if(details && details.id){        
        this.userId=details.id;
       this.loadSubmissions()
      }
    });
  }
  loadPost(){
    if(this.skip>0){
    this.loadSubmissions();}
  }

  loadSubmissions(){
          if(this.userId){             
            this.postService.getMessageByUserId(this.userId,""+this.skip).subscribe(res=>{              
              if(res['messageList'] && res['messageList'].length>0){
              this.listOfMessage=[...this.listOfMessage,...res['messageList']]; 
              this.skip+=res['messageList'].length
              }
            } )
          }
  }

}
