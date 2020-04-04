import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { SsoService } from './sso.service';
import { Constants } from '../shared/constants';
import { TokenType } from '../shared/model/tokenType';
import { Token } from '../shared/model/token';
@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SsoComponent implements OnInit {
  code:string;
  provider:string
  status:string="get token";
  constructor(private route:ActivatedRoute, private storage:StorageService,private sso:SsoService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params["code"];
      this.provider = params["provider"]; 
      if(this.code && this.provider){
        this.signIn();
      }else{
        this.status="fial code provider empty "
      }
       
    })
  }
  signIn(){
    this.sso.getToken(this.code,this.provider).subscribe(response=>{ 
      let tokenType:TokenType;
      switch(this.provider){
        case "git": tokenType=TokenType.GIT_HUB_OAUTH_TOKEN;break;
        case "vk": tokenType=TokenType.VK_OAUTH_TOKEN;break;
        case "fb": tokenType=TokenType.FB_OAUTH_TOKEN;break;
        default: this.status="fial no such provider";setTimeout(()=>{window.close();},3000);
      }         
      this.storage.updateToken(new Token(response['access_token'],true,tokenType));               
      this.status='success'; 
      setTimeout(()=>{window.close();},3000);
    },error=>{
      this.status='error cant get token'; 
      setTimeout(()=>{window.close();},3000);
    });
  }
  
}
