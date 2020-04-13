import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../shared/services/storage.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLogedIn:boolean;
  @Input("userDetailsMenu")
  userDetailsMenu: MatDrawer;
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
    this.userDetailsMenu.toggle();
}
}
