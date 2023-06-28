import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  // API url
  uploadUrl = "https://localhost:7045/Document/uploadFromUI";
  getDataUrl = "https://localhost:7045/Document";
    
  constructor(private http:HttpClient) { }
  
  getFilesData():Observable<any> {
    debugger;
    return this.http.get(this.getDataUrl);

  }

  // Returns an observable
  upload(file:any):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append('file', file, file.name);

      const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.uploadUrl, formData,{headers: headers})
  }
}
