import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-site-options',
  templateUrl: './site-options.component.html',
  styleUrls: ['./site-options.component.scss']
})
export class SiteOptionsComponent implements OnInit {

  time:number
  timer:number
  timerMin:number
  timerSec:number
  days:number
  hours:number
  isTimer:boolean = false
  isTikTok:boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://18.156.3.210:8081/api/p/nomination/time').subscribe(item => {
      this.time = +new Date(item['time'])
      this.days = new Date(item['time']).getDay()
      this.hours = new Date(item['time']).getHours()
      
      if(this.time === 0){
        this.isTimer = true
        this.timer = +new Date(item['timeout'])
        this.timerMin = new Date(item['timeout']).getMinutes()
        this.timerSec = new Date(item['timeout']).getSeconds()
        if(this.timer <= 30000){
          this.isTikTok = true
        } this.isTikTok = false
      } else{
        this.isTimer = false
      }
    })
  }

}
