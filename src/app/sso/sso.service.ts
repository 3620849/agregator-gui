import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams, HttpHeaders,HttpResponse} from '@angular/common/http';     
import { environment } from 'src/environments/environment';

    
@Injectable({
  providedIn: 'root'
})
export class SsoService {

  constructor(private http:HttpClient) {}
  getToken(code:string,provider:string){
    let url = environment.base_url+"/api/p/token";
    const options = {
      headers:new HttpHeaders().set("Accept","application/json").set("NOT_INTERCEPT","true"),
      params:new HttpParams().set("code",code).set("provider",provider)}
    return this.http.get(url,options)
  }

  // getGitHubTUserData(token:string){
  //   let url = "https://api.github.com/user"
  //   const options = {
  //     headers:new HttpHeaders().set("Accept","application/json").set("NOT_INTERCEPT","true"),
  //     params:new HttpParams().set("Authentication",`token ${token}`)}
  //   return this.http.post(url,options);
  // }
}
