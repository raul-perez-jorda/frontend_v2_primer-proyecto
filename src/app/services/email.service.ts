import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/email';

  constructor(private http: HttpClient) { }

  enviarCorreo(postData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, postData);
  }
}
