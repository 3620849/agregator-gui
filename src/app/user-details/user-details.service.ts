import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { StorageService } from '../shared/services/storage.service';
import { Token } from '../shared/model/token';
import { Constants } from '../shared/constants';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  userDetails = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private storage: StorageService) {
    storage.broadcastToken.subscribe(res => {
      if (!res.isValid) {
        this.userDetails.next(null);
      } else {
        this.updateUserDetails();
      }
    })
  }
  updateUserDetails() {
    if (!this.userDetails.value) {
      this.http.get(environment.base_url + "/api/s/user").subscribe(res => {
        this.userDetails.next(res);
      })
    }
  }
  getUserDetails() {
    return this.userDetails;
  }
}
