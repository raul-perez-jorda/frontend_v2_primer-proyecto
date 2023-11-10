import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telefono, Consumo, Estadisticas } from '../interfaces/telefono';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  constructor(private http: HttpClient) { }

  getTelefonos( id_cli:number ): Observable<Telefono[]> {
    return this.http.get<Telefono[]>('http://localhost:3000/clientes/'+id_cli+'/telefonos');
  }

  getConsumos(id_cli:number, id_tel:number): Observable<Consumo[]> {
    return this.http.get<Consumo[]>('http://localhost:3000/clientes/'+id_cli+'/telefonos/'+id_tel+'/consumos')
  }

  getEstadisticasConsumo(id_cli:number, id_tel:number): Observable<Estadisticas[]> {
    return this.http.get<Estadisticas[]>('http://localhost:3000/clientes/'+id_cli+'/telefonos/'+id_tel+'/estadisticas-consumo')
  }

  updateTelefono(id_tel:number, putData:any): Observable<any> {
    return this.http.put('http://localhost:3000/telefonos/'+id_tel, putData)
  }

  updateConsumo(id_consumo: number, putData:any): Observable<any> {
    return this.http.put('http://localhost:3000/clientes/datos_consumo/'+id_consumo, putData)
  }

  deleteTelefono(id_tel: number): Observable<any> {
    return this.http.delete('http://localhost:3000/telefonos/'+id_tel)
  }

  deleteConsumo(id_consumo: number): Observable<any> {
    return this.http.delete('http://localhost:3000/clientes/consumos/'+id_consumo)
  }
}
