import { HttpClient ,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core'; 

import { environment } from '../../environments/environment';
import { UserData } from '../shared/model/userData';
import { Token } from '../shared/model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   
  constructor(private http:HttpClient) { }

  sendCredentials(user:UserData){   
    let credentials ="Basic "+btoa(user.mail+":"+user.password); 
    let header = new HttpHeaders()
    .set('Content-Type', "application/json")
    .set('Authorization', credentials)   	
    .set('NOT_INTERCEPT', "true");   	
  	return this.http.get(environment.base_url+"/api/s/ka",{headers:header, observe: 'response'});
  }
  checkToken(token:Token){
    let header = new HttpHeaders()
    .set('Content-Type', "application/json")
    return this.http.get(environment.base_url+"/api/s/ka",{headers:header, observe: 'response'});
  }

}
