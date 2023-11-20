import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InfoToken, User } from '../interfaces/users';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private cookies: CookieService) { }

  login(getData: any): Observable<any> {  
    return this.http.post<any>('http://localhost:3000/login', getData);
  }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  decodeToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/decodeToken`, {token})
  }

  setToken(token:string) {
    this.cookies.set("token",token);
  }
  
  getToken() {
    return this.cookies.get("token");
  }
}
