import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, iif } from 'rxjs';
import { retry, catchError, timeout, concatMap, retryWhen, delay, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    readonly NUMBER_RETRY: number = environment.retries;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(retryWhen(errors => errors.pipe(
            concatMap((error, count) => {
                if (count > this.NUMBER_RETRY) {
                   // console.log({ severity: 'error', summary: 'Error', detail: error.message })
                }else{
                 // console.log({ severity: 'warn', summary: 'Warning', detail: `Request failed retry (${count+1})`})
                }
                return iif(() => count > this.NUMBER_RETRY, throwError(error), of(error).pipe(delay(1000)))
            }
            ),tap(error => { 
                if (error.status!=0 && error.status<500 ) {
                  throw error;
                }
                console.log('Retrying...');
              }))));
    }
}