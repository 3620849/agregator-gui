import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddNewPostService {

  constructor(private http:HttpClient) {}
  sendNewPost(body){
    let url = environment.base_url+"/api/p/post";
    return this.http.put(url,body).subscribe(x=>console.log(x));
  }
}
