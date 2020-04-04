import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { StorageService } from '../shared/services/storage.service';
import { Token } from '../shared/model/token';
import { Constants } from '../shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  
  constructor(private http:HttpClient) { 
    
  }

  getUserDetails(){
    return this.http.get(environment.base_url+"/api/s/user");
  }
}
