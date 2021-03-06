import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginService } from '../../login/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../model/token';
import { Constants } from '../constants';
import { environment } from 'src/environments/environment';
import { TokenType } from '../model/tokenType';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public broadcastToken: BehaviorSubject<Token>;
  currentState: Token;
  keepAliveInterval;
  
  constructor(private storage: LocalStorageService, private loginService: LoginService) {
    this.currentState = this.storage.retrieve(Constants.TOKEN);
    if(this.currentState==undefined){
      let token = new Token(null, false, null);
      this.broadcastToken = new BehaviorSubject(token);
      this.updateToken(token);
    }else{
      this.broadcastToken = new BehaviorSubject(this.currentState);
    }
  }
  startKeepAlive() {
    this.tokenHeartBeat();
    if (this.keepAliveInterval == undefined) {
      this.keepAliveInterval = setInterval(() => { this.tokenHeartBeat() }, environment.keep_alive_timeout);
    }
  }
  cleanToken() {
    this.updateToken(new Token(null, false, null));
    clearInterval(this.keepAliveInterval);
  }
  updateToken(token: Token) {
    this.storage.store(Constants.TOKEN, token);
    this.currentState = token;
    this.broadcastToken.next(this.currentState);
  }
  tokenHeartBeat(): void {
    let token: Token = this.storage.retrieve(Constants.TOKEN);
    if (token == null || token.token == null) {      
      this.cleanToken();
    }
    this.loginService.checkToken(token).subscribe(response => {
      if (response.body === true) {
        token.isValid = true;
        this.currentState = token;
        this.broadcastToken.next(this.currentState);
      }
    }, error => {
      this.cleanToken();
    })
  }

  getToken(): Token {
    return this.currentState;
  }
  scanTokenChanges(){
    this.storage.observe(Constants.TOKEN).subscribe(x=>{
      if(x.token && x.isValid){ 
        this.currentState=x;    
        this.startKeepAlive()
      }
    })
  }
  setClientId(clientId:string){
    let cid = this.storage.retrieve(TokenType.CLIENT_ID);
    if(cid==null){
      this.storage.store(TokenType.CLIENT_ID,clientId);
    }

  }
  getClientId():string{
    return this.storage.retrieve(TokenType.CLIENT_ID);
  }
}
