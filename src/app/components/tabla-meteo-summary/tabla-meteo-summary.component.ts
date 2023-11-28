import { Component, Input } from '@angular/core';
import { DatosMeteoRepresentar } from 'src/app/interfaces/meteorologia';

@Component({
  selector: 'app-tabla-meteo-summary',
  templateUrl: './tabla-meteo-summary.component.html',
  styleUrls: ['./tabla-meteo-summary.component.css']
})
export class TablaMeteoSummaryComponent {
  @Input() datos_meteo_para_representar! : DatosMeteoRepresentar; 
  @Input() indice_dia : number = 0;

  nombre_dia = ['Hoy', 'Mañana', 'Pasado', 'En 3 días', 'En 4 días'];

  getImagenCieloUrl(valor_estadoCielo: string): string {
    return `assets/imagenes_cielo/${valor_estadoCielo}.png`;
  }
}
