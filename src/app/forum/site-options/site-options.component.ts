import { Component, OnInit } from '@angular/core';
import { TimeContorlService } from 'src/app/shared/services/time-contorl.service';

@Component({
  selector: 'app-site-options',
  templateUrl: './site-options.component.html',
  styleUrls: ['./site-options.component.scss']
})
export class SiteOptionsComponent implements OnInit {
  nominationTime:string;
  constructor(private timeControlSrv:TimeContorlService) { }

  ngOnInit(): void {
    this.timeControlSrv.time.subscribe(time =>{
      this.nominationTime= time;
    })
  }

}
