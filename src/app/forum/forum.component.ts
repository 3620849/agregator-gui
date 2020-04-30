import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SiteOptionsComponent } from './site-options/site-options.component';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  dialogRef: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openOptionsPopup(): void {
    this.dialogRef = this.dialog.open(SiteOptionsComponent, {
      panelClass:'options-component',
      width: '350px'    
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
