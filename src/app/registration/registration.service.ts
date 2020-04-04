import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient ,HttpHeaders,HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private loginService:LoginService,private http:HttpClient) { }
  createNewUser(user:{mail:string,password:string}){
       let header = new HttpHeaders()
       .set('Content-Type', "application/json");  	
      return this.http.put(environment.base_url+"/api/p/user/",{password:user.password,login:user.mail},{headers:header, observe: 'response'});
    //}
  }
}
