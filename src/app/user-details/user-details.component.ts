import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { StorageService } from '../shared/services/storage.service';
import { Token } from '../shared/model/token';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userData;
  constructor(private userService:UserDetailsService,private storage:StorageService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(response=>{
        this.userData=response;
    });
    
  }
  logout(){
    this.storage.cleanToken();
  }

}
