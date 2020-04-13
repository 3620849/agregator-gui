import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AppService } from './app.service';
import { StorageService } from './shared/services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gui';
  currentURL:string;
  ssoMode:boolean;
  isLogedIn:boolean;
  constructor(private location: Location,private appService:AppService,
    private storage:StorageService){
    this.currentURL = window.location.href; 
    appService.loadSystemSettings();
  }
  ngOnInit() {
    if(this.currentURL.includes("sso")){
      this.ssoMode=true;
    }
    this.isLogedIn=this.storage.getToken().isValid;
    this.storage.broadcastToken.subscribe(res=>{
      this.isLogedIn=res.isValid;
    });
   
}
}
