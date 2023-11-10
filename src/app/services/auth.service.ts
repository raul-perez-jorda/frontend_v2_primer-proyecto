import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  decodeToken(token: string) {
    return this.http.post(`${this.baseUrl}/decodeToken`, {token})
  }
}
