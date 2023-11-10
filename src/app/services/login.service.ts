import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from '../interfaces/login';

import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private cookies: CookieService) { }

  login(getData: any): Observable<any> {  
    return this.http.post<any>('http://localhost:3000/login', getData);
  }

  setToken(token:string) {
    this.cookies.set("token",token);
  }
  
  getToken() {
    return this.cookies.get("token");
  }
}
