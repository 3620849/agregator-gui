import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeContorlService {
  time: BehaviorSubject<string>;
  private DAY: number = 86400000;
  private HOUR: number = 3600000;
  private MINUTES: number = 60000; 

  constructor(private http: HttpClient) {
    this.time = new BehaviorSubject<string>("loading...");
    this.getNominationTime();
  }
  private getNominationTime() {
    this.http.get(environment.base_url + "/api/p/nomination/time").pipe(take(1)).subscribe(
      res => {
        if(res['time']===0){
          this.time.next("We choosing the winner!");
        }
        let timeString: string = this.convertMsToString(res['time']);        
        if (timeString) {          
          this.time.next(timeString);
        }
      }
    )
  }
  private convertMsToString(time: number): string {
    let res = "";
    let days = Math.floor(time / this.DAY);
    if (days > 1) {
      res += days + " Days"
    } else if (days === 1) {
      res += days + " Day"
    }
    let hours = Math.floor(time % this.DAY / this.HOUR);
    if (hours > 1) {
      res += hours + " hours";
    } if (hours === 1) {
      res += hours + " hour";
    }
    console.log("time"+time);

    console.log("days"+days);
    if (days === 0) {
      let minutes = Math.floor(time % this.DAY % this.HOUR / this.MINUTES);
      if (minutes > 1) {
        res += minutes + " minutes"
      } else if (minutes === 1) {
        res += minutes + " minute"
      }
    }
 
    return res;
  }
}
