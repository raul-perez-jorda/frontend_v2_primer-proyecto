import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../interfaces/log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addLog(logDetails: Log) {
    return this.http.post(`${this.baseUrl}/logs`, logDetails)
  }
}
