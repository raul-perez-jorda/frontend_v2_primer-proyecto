import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log, newLog } from '../interfaces/log';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addLog(logDetails: newLog) {
    return this.http.post(`${this.baseUrl}/logs`, logDetails)
  }

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.baseUrl}/logs`)
  }
}
