import { Component, OnInit, AfterViewInit} from '@angular/core';
import { AddNewPostService } from './add-new-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss']
})
export class AddNewPostComponent implements OnInit {
  post={
    header:"",
    content:[]
  }
  inputHeader:string;
  loading=false;
  constructor(private postSrv:AddNewPostService,private router:Router) { }

  ngOnInit(): void {
    this.post.content.push({text:"",type:"text"});
  }
  remove(index){
    this.post.content.splice(index,1);
  }
  add(mediaType:string){
    switch(mediaType){
      case "img": this.post.content.push({url:"",type:"img"});break;
      case "text": this.post.content.push({text:"",type:"text"});break;
      case "video": this.post.content.push({url:"",type:"video"});break;
    }
    
  }
 sendPost(){
  this.loading=true; 
   this.postSrv.sendNewPost(this.post).subscribe(res=>{

    this.router.navigateByUrl("/forum",{ state: {tab: 'new'} });
   },err=>{
     this.loading=false;
   });
 }
  changeHeader($event){
    this.post.header=this.inputHeader;
  }
}
