import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef,MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { StorageService } from '../shared/services/storage.service';
import { Constants } from '../shared/constants';
import { faFacebookF,faGithub,faVk,faGoogle,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { RegistrationComponent } from '../registration/registration.component';
import { UserData } from '../shared/model/userData'; 
import { TokenType } from '../shared/model/tokenType';
import { Token } from '../shared/model/token';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  
  //icons
  fb=faFacebookF
  git=faGithub
  vk=faVk
  ggl=faGoogle
  twt=faTwitter

	@ViewChild("pass")
	inp: ElementRef;
  form:FormGroup;
  status:string="form";
  result_message:string;
  constructor(private dialogRef: MatDialogRef<LoginComponent>,
  	private loginService:LoginService,
    public formBuilder: FormBuilder,
    private storage:StorageService,
    public dialog: MatDialog,
    private appService:AppService ) { 
       
      
    }

  ngOnInit() {
  	this.form =  this.formBuilder.group({
					mail:[,[]],
					password:[,[]]
				});
  }
 login(){
 	let credentials=new UserData(this.form.getRawValue()["mail"],this.form.getRawValue()["password"]);
   
   this.status='progress';  
   this.loginService.sendCredentials(credentials).subscribe(response=>{   
     let newToken:Token = new Token(response.headers.get(TokenType.X_TOKEN),true,TokenType.X_TOKEN); 
      this.storage.updateToken(newToken);  
      this.storage.startKeepAlive();    
      this.status='success'; 
      setTimeout(()=>{this.dialogRef.close();},3000);
    },error=>{
      console.log(error);
      this.status="fail"; 
      setTimeout(()=>{        
        this.dialogRef.close();
      },3000);       
   });   
  }
  cancel(){
    this.dialogRef.close();
  }
  visible(){
  	if(this.inp.nativeElement.type==="password"){
  		this.inp.nativeElement.type="text"
  	}else{
  		this.inp.nativeElement.type="password"
  	};
  }
  register(){
      const dialogRef = this.dialog.open(RegistrationComponent, {
      panelClass:'registration-component',
      width: '500px',      
    });
    this.cancel();
  }
  auth2(provider:string){
    const options = `width=500,height=500,left=0,top=0`;
    let settings = this.appService.systemSettings;
    this.storage.scanTokenChanges();
    switch (provider) {
      case 'git':        
        window.open(settings.git_userAuthorizationUrl,'Authorization',options);        
        break;
        case 'vk': 
        window.open(settings.vk_userAuthorizationUrl,'Authorization',options);
        case 'fb': 
        window.open(settings.fb_userAuthorizationUrl,'Authorization',options);        
        break;
    }
    this.storage.broadcastToken.subscribe(res=>{
      if(res && typeof res.isValid==="boolean" && res.isValid == true){
        this.dialogRef.close();
      };
    });
  }
}
