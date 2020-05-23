import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostFeedService {

  constructor(private http:HttpClient) { }
  getPostFeed(name:string,skip:string){
    let options ={
      params:new HttpParams().set("type",name).set("skip",skip)
    }
    return this.http.get(environment.base_url+"/api/p/message",options);
  }
  getMessageByIds(listOfIds:{idsList:string[]}){
    return this.http.post<any[]>(environment.base_url+"/api/p/message",listOfIds);
  }
  getMessageByUserId(userId:string,skip:string){
    let options ={
      params:new HttpParams().set("userId",userId).set("skip",skip)
    }
    return this.http.get<any[]>(environment.base_url+"/api/s/user/submissions",options);
  }
}
