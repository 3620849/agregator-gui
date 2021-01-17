import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { SEOService } from 'src/app/shared/services/seo.service';
import { PostFeedService } from '../post-feed/post-feed.service';

@Component({
  selector: 'app-expanded-post',
  templateUrl: './expanded-post.component.html',
  styleUrls: ['./expanded-post.component.scss']
})
export class ExpandedPostComponent implements OnInit {
  private subscription: Subscription;
  id:string;
  message=new BehaviorSubject<any>(null);
  post;
  metadata:any ={};
  constructor(private activateRoute: ActivatedRoute,private postService:PostFeedService,private seoService: SEOService){
          
}

  ngOnInit(): void {    
  
    this.activateRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.postService.getMessageByIds({idsList:[this.id]}).subscribe(list=>{
        this.message.next(list['messageList'][0]);
        this.post = list['messageList'][0];
        this.extractMetadata();
      });
    });
    
  }
  extractMetadata(){
    this.seoService.updateTitle(this.post.header)
    this.seoService.updateMetaInfo("og:title",this.post.header);
    for(let i =0;i<this.post.content.length;++i){
      if(this.post.content[i].type=="text"){
        let content = this.post.content[i].text;
        this.seoService.updateMetaInfo("og:description",content.substring(0,Math.min(40,content.length)));
        break;
      }
    }
    for(let i =0;i<this.post.content.length;++i){
      if(this.post.content[i].type=="img" || this.post.content[i].type=="video"){
        this.seoService.updateMetaInfo("og:image",this.post.content[i].url);
        break;
      }
    }
  }
}
