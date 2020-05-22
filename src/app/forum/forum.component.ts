import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SiteOptionsComponent } from './site-options/site-options.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  tabs={top:0,new:1,monthly:2}
  dialogRef: any;
  state$: Observable<object>;
  tab=this.tabs.top;
  currentIndex=0;
  constructor(public dialog: MatDialog,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
      this.state$.subscribe(state=>{
        if(state['tab']){
          this.tab = this.tabs[state['tab']];
        }
      });
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
