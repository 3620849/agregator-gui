import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SystemSettings } from './system-settings';
import { StorageService } from './shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public systemSettings:SystemSettings;
  constructor(private http:HttpClient,private storage:StorageService) { 
    
  }
  loadSystemSettings(){
    this.http.get<SystemSettings>(environment.base_url+"/api/p/systemSettings").subscribe(res=>{
      this.systemSettings = res;
      this.storage.setClientId(res.clientId);
    })
  }
}
