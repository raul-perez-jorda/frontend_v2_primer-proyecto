import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cliente, RespuestaCliente } from '../interfaces/cliente';
import { ThisReceiver, parseHostBindings } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  id_cli !: number;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:3000/clientes');
  }

  getCliente(id_cli: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/clientes/'+ id_cli);
  } 

  saveCliente(postData: any): Observable<RespuestaCliente> {
    return this.http.post<RespuestaCliente>('http://localhost:3000/clientes', postData);
  }

  saveTelefono(postData: any): Observable<any> {
    return this.http.post('http://localhost:3000/clientes/:id_cli/telefonos',postData)
  }

  saveConsumo(postData: any): Observable<any> {
    return this.http.post('http://localhost:3000/consumos',postData)
  }

  updateCliente(id_cli: number, putData: any): Observable<any> {
    return this.http.put('http://localhost:3000/clientes/'+id_cli, putData)
  }

  eliminaCliente(id_cli: any): Observable<any> {
    return this.http.delete('http://localhost:3000/clientes/'+id_cli)
  }
}
