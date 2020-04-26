import { Component, OnInit, AfterViewInit} from '@angular/core';
import { AddNewPostService } from './add-new-post.service';

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
  constructor(private postSrv:AddNewPostService) { }

  ngOnInit(): void {
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
   console.log(this.post);
   this.postSrv.sendNewPost(this.post);
 }
  changeHeader($event){
    this.post.header=this.inputHeader;
  }
}
