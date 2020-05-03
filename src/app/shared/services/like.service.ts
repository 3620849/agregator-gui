import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http:HttpClient) { }
  likeOrDis(id:string,value:string){
    return this.http.get(environment.base_url+"/api/p/likeOrDislike",
    {params:new HttpParams().set("messageId",id).set("value",value)})
  }
}
