import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SystemSettings } from './system-settings';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public systemSettings:SystemSettings;
  constructor(private http:HttpClient) { 
    
  }
  loadSystemSettings(){
    this.http.get<SystemSettings>(environment.base_url+"/api/p/systemSettings").subscribe(res=>{
      this.systemSettings = res;
    })
  }
}
