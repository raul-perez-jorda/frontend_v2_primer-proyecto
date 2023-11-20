import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosMeteoRepresentar } from '../interfaces/meteorologia';

@Injectable({
  providedIn: 'root'
})
export class MeteorologiaService {

  url_nuestro_back = 'http://localhost:3000/'
  api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXVsLnBlcmV6QHRkY29uc3VsdGluZy5lcyIsImp0aSI6IjJjNjk1MTViLWExNGYtNDg4My04YmM1LTRhMDliOTA3Y2YzMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzAwMDQxMTE2LCJ1c2VySWQiOiIyYzY5NTE1Yi1hMTRmLTQ4ODMtOGJjNS00YTA5YjkwN2NmMzMiLCJyb2xlIjoiIn0.nkLRt4RpkAS3ZEiNjZZxlHMmRRn8rd9CReTyU2XZiv8'
  url_predicc_municip_diaria = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/'

  constructor(private http: HttpClient) { }

  getCodigoMunicipio(nombre_municipio: string): Observable<any> {
    return this.http.get<any>(this.url_nuestro_back + 'codigo_municipio/' + nombre_municipio);
  }

  getJsonUrl(id_municipio:string): Observable<any> {
    return this.http.get<any>(this.url_predicc_municip_diaria + id_municipio + '?api_key=' + this.api_key)
  }

  getMeteoDataAemet(url:string): Observable<any> {
    return this.http.get<any>(url)
  }

  saveMeteoData(codigo_n_meteoData: any): Observable<any> {
    return this.http.post<any>(this.url_nuestro_back + 'save_data', codigo_n_meteoData);
  }

  getMeteoDataDB(id_municipio: string): Observable<DatosMeteoRepresentar> {
    return this.http.get<DatosMeteoRepresentar>(this.url_nuestro_back+'datos_meteo/'+id_municipio);
  }
}
