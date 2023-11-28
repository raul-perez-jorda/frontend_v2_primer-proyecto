import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosMeteoRepresentar } from '../interfaces/meteorologia';

@Injectable({
  providedIn: 'root'
})
export class MeteorologiaService {

  url_nuestro_back = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getListaMunicipios(): Observable<{nombre_municipio:string}[]> {
    return this.http.get<{nombre_municipio:string}[]>(this.url_nuestro_back + 'lista_municipios');
  }

  getCodigoMunicipio(nombre_municipio: string): Observable<any> {
    return this.http.get<any>(this.url_nuestro_back + 'codigo_municipio/' + nombre_municipio);
  }

  getMeteoDataDB(id_municipio: string): Observable<DatosMeteoRepresentar> {
    return this.http.get<DatosMeteoRepresentar>(this.url_nuestro_back+'datos_meteo/'+id_municipio);
  }
}
