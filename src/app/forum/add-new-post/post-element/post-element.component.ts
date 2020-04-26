import { Component, OnInit, Input, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-post-element',
  templateUrl: './post-element.component.html',
  styleUrls: ['./post-element.component.scss']
})
export class PostElementComponent implements OnInit {
  @Input()
  data; 
  imgUrl  
  show=false;
  constructor( ) { }
  
  ngOnInit(): void {
  } 
  setImage(){
    this.show=true;
    this.data.url = this.imgUrl;
    console.log(this.imgUrl);
  }

}
