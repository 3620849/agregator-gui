import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gui';
  currentURL:string;
  isSso:boolean;
  constructor(private location: Location,private appService:AppService){
    this.currentURL = window.location.href; 
  }
  ngOnInit() {
    if(this.currentURL.includes("sso")){
      this.isSso=true;
    }
   
}
}
