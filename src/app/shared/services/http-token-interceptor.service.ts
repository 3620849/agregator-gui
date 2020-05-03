import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, iif } from 'rxjs';
import { retry, catchError, timeout, concatMap, retryWhen, delay } from 'rxjs/operators';
import { Constants } from '../constants';
import { StorageService } from './storage.service';
import { TokenType } from '../model/tokenType';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getToken().token;   
    const tokenType = this.storage.getToken().tokenType;
    console.log(this.storage.getClientId());
    if (!request.headers.has("NOT_INTERCEPT")) {
      if (token) {
        request = request.clone({
          headers: request.headers.set(tokenType, token)
        })
      }
    }  
    return next.handle(request.clone({
      headers: request.headers.set(TokenType.CLIENT_ID,this.storage.getClientId()).delete("NOT_INTERCEPT")}));
  }
}
