import { Component, OnInit } from '@angular/core';
import { PostFeedService } from '../post-feed/post-feed.service';
import { UserDetailsService } from 'src/app/user-details/user-details.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  skip=0;
  listOfMessage=[];
  myLikedIds=[];
  constructor(private postService:PostFeedService,private userService:UserDetailsService) { }

  ngOnInit(): void {
     
    this.userService.getUserDetailsHttp().pipe(take(1)).subscribe(details=>{
      if(details && details.markList && details.markList && details.markList.length>0){
       this. myLikedIds =details.markList.filter(x=>x.value==1).map(x=>{return x.messageId });
       this.userService.setUserDetails(details);
       this.loadLikeList()
      }
    });
  }
  loadPost(){
    this.loadLikeList();
  }

  loadLikeList(){ 
    let pop = this.myLikedIds.splice(0, 20)
          if(pop.length>0){
            let body = {idsList:pop}
            this.postService.getMessageByIds(body).subscribe(res=>{
              this.listOfMessage=[...this.listOfMessage,...res['messageList']]; 
            } )
          }
  }

}
