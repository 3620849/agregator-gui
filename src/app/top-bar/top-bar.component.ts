import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../shared/services/storage.service';
import { MatDrawer } from '@angular/material/sidenav';
import { SiteOptionsComponent } from '../forum/site-options/site-options.component';
import { UserDetailsService } from '../user-details/user-details.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLogedIn:boolean;
  optionsRef: any;
  @Input("userDetailsMenu")
  userDetailsMenu: MatDrawer;
  userDetails;
  constructor(public dialog: MatDialog,private storage:StorageService,private userService:UserDetailsService ) {
    storage.startKeepAlive();
  }

  ngOnInit(): void {
    this.isLogedIn=this.storage.getToken().isValid;
    this.storage.broadcastToken.subscribe(res=>{
      this.isLogedIn=res.isValid;
      this.userService.getUserDetails().subscribe(details=>{         
          this.userDetails=details;         
      })
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

openOptionsPopup(): void {
  this.optionsRef = this.dialog.open(SiteOptionsComponent, {
    panelClass:'options-component',
    width: '350px'    
  });
}

closeOptionsPopup(): void {
  this.optionsRef.close();
}
}
