import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CodigoNDatosMeteo, DatosMeteoRepresentar } from 'src/app/interfaces/meteorologia';
import { MeteorologiaService } from 'src/app/services/meteorologia.service';
import { ReactiveFormsModule } from '@angular/forms';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-meteorologia',
  templateUrl: './meteorologia.component.html',
  styleUrls: ['./meteorologia.component.css']
})
export class MeteorologiaComponent implements OnInit{

  id_municipioSelected!:string;
  nombre_municSelected!:string;
  nombre_munic!:string;

  array_todos_municipios:string[] = [];
  filteredMunicipios: any[] = [];

  codigo_n_datos_meteo: CodigoNDatosMeteo = {
    codigo: '',
    datosMeteoHoy: '',
    datosMeteoManana: '',
    datosMeteoPasado:''
  }

  indice_dias = [0, 1, 2, 3, 4]; // Indice de los dias que quiero representar en los summaries (0 es hoy)

  datos_meteo_para_representar !: DatosMeteoRepresentar;
  showDatosMeteo=false;

  chart_selected: string = 'temperaturasHoy';
  chartSelection = [
    { label: 'Temperaturas hoy', chart_selected: 'temperaturasHoy'},
    { label: 'Temperaturas máximas y mínimas', chart_selected: 'max-mins'}
  ];

  data_chart_temperaturas_hoy:any;
  data_chart_temperaturas_maxmin:any;
  documentStyle = getComputedStyle(document.documentElement);


  constructor(private meteorologiaService: MeteorologiaService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.meteorologiaService.getListaMunicipios().subscribe(
      response => {
        this.array_todos_municipios = response.map(element => element.nombre_municipio);
        console.log(this.array_todos_municipios)
      }
    )
  }

  filterMunicipio(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.array_todos_municipios as any[]).length; i++) {
        let municipio = (this.array_todos_municipios as any[])[i];
        if (municipio.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(municipio);
        }
    }

    this.filteredMunicipios = filtered;
}

  // Función que obtiene los datos y los representa
  ObtenerDatosMeteo(nombre_munic: string) {
    this.meteorologiaService.getCodigoMunicipio(nombre_munic).subscribe( // Get el codigo del municipio
      response => {
        this.id_municipioSelected = response[0].id_municipio;
        this.nombre_munic = response[0].nombre_municipio;

        this.meteorologiaService.getMeteoDataDB(this.id_municipioSelected).subscribe(
          response => {
            this.datos_meteo_para_representar = response;
            this.messageService.add({ severity: 'success', summary: 'Datos obtenidos correctamente'})
            this.showDatosMeteo = true;
        
            const arrayTemperaturasHorariasHoy: number[] = this.datos_meteo_para_representar.temp_horas_hoy.map(item=>item.valor_int)
            const arraySensTermicasHoy: number[] = this.datos_meteo_para_representar.sensTermica_hoy.map(item=>item.valor_int)
            const arrayTemperaturasMax: number[] = this.datos_meteo_para_representar.temp_maximas.map(item=>item.valor_int)
            const arrayTemperaturasMin: number[] = this.datos_meteo_para_representar.temp_minimas.map(item=>item.valor_int)
            console.log(arrayTemperaturasHorariasHoy)
    
            this.data_chart_temperaturas_hoy = {
                labels: ['6:00', '12:00', '18:00', '24:00'],
                datasets: [
                  {
                    data: arraySensTermicasHoy,
                    fill: false,
                    borderColor: this.documentStyle.getPropertyValue('--green-500'),
                    tension: 0.2,
                    label: 'Sensación térmica',
                    borderWidth: 1
                  },
                  {
                    data: arrayTemperaturasHorariasHoy,
                    fill: true,
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.2,
                    label: 'Temperatura',
                    borderWidth: 2
                  }
                    
                ]
            };
            this.data_chart_temperaturas_maxmin = {
              labels: ['Hoy', 'Mañana', 'Pasado', 'En 3 días', 'En 4 días'],
              datasets: [
                {
                  data: arrayTemperaturasMax,
                  fill: false,
                  borderColor: this.documentStyle.getPropertyValue('--red-500'),
                  tension: 0.2,
                  label: 'Temperatura máxima',
                  borderWidth: 2
                },
                {
                  data: arrayTemperaturasMin,
                  fill: false,
                  borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                  tension: 0.2,
                  label: 'Temperatura mínima',
                  borderWidth: 2
                }
                  
              ]
          };
          }
        )
      }
    )   
  }

  goToTelefonos() {
    this.router.navigate(['/login']);
  }
  
}






