import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../shared/services/storage.service';
import { UserDetailsComponent } from '../user-details/user-details.component'; 

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLogedIn:boolean;
  constructor(public dialog: MatDialog,private storage:StorageService ) {
    storage.startKeepAlive();
  }

  ngOnInit(): void {
    this.isLogedIn=this.storage.getToken().isValid;
    this.storage.broadcastToken.subscribe(res=>{
      this.isLogedIn=res.isValid;
    });
  }
	openLoginDialog(): void {
	    const dialogRef = this.dialog.open(LoginComponent, {
	    	panelClass:'login-component',
	      width: '500px',      
	    });
  }
  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      panelClass:'user-component',
      width: '500px',      
    });
}
}
