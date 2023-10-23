import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telefono } from './telefono';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  constructor(private http: HttpClient) { }

  getTelefonos( id_cli:number ): Observable<Telefono[]> {
    return this.http.get<Telefono[]>('http://localhost:3000/clientes/'+id_cli+'/telefonos');
  }
}
