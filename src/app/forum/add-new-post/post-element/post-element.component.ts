import { Component, OnInit, Input, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

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
  loading=false; 
  constructor(private fileSrv:FileService ) { }
  
  ngOnInit(): void {
  } 
  setImage(){
    this.show=true;
    this.data.url = this.imgUrl; 
    
  }
  handleFileInput(files: FileList){
    this.loading=true;
    this.fileSrv.getImageLink(files.item(0)).subscribe(res=>{
      if(res['url']){
      this.data.url = res['url']; 
      this.show=true;
      }else{
        this.show=false;
      }
      this.loading=false;
    },err=>{
      this.show=false;
      this.loading=false;
    })

  }
}
