import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  getImageLink(file: File){
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    let headers = new HttpHeaders();
    headers = headers.delete('Content-Type');
    
    return this.http
      .post(environment.base_url+"/api/p/upload", formData, { headers: headers, reportProgress: true });
  }
}
