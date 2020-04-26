import { Component, OnInit, AfterViewInit} from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  remove(index){
    this.post.content.splice(index,1);
  }
  add(mediaType:string){
    switch(mediaType){
      case "img": this.post.content.push({url:"",type:"img"});break;
      case "text": this.post.content.push({content:"",type:"text"});break;
      case "video": this.post.content.push({url:"",type:"video"});break;
    }
    
  }

}
