import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppModule } from 'src/app/app.module';
import { CodigoNDatosMeteo, DatosMeteoRepresentar } from 'src/app/interfaces/meteorologia';
import { MeteorologiaService } from 'src/app/services/meteorologia.service';

@Component({
  selector: 'app-meteorologia',
  templateUrl: './meteorologia.component.html',
  styleUrls: ['./meteorologia.component.css']
})
export class MeteorologiaComponent implements OnInit{

  id_municipioSelected!:string;
  nombre_municSelected!:string;
  nombre_munic!:string;

  codigo_n_datos_meteo: CodigoNDatosMeteo = {
    codigo: '',
    datosMeteoHoy: '',
    datosMeteoManana: '',
    datosMeteoPasado:''
  }

  datos_meteo_para_representar !: DatosMeteoRepresentar;
  showDatosMeteo=false;

  data:any;
  // Dibujar la gráfica de las temperaturas a lo largo del día
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: this.textColor
            }, display: false,
        }
    },
    scales: {
        x: {
            ticks: {
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            },
            beginAtZero: true,
        }
    }
};

  constructor(private meteorologiaService: MeteorologiaService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    
  }

  // Función que obtiene datos meteorológicos y los mete en la base de datos
  ActualizarDatosMeteorologicos(nombre_munic: string) {
    this.meteorologiaService.getCodigoMunicipio(nombre_munic).subscribe( // Get el codigo del municipio
      response => {
        this.id_municipioSelected = response[0].id_municipio;
        this.nombre_municSelected = response[0].nombre_municipio;

        this.meteorologiaService.getJsonUrl(this.id_municipioSelected).subscribe( // Get la url de donde saco los datos
          response => { 
            const url_datos_meteo = response.datos;

            this.meteorologiaService.getMeteoDataAemet(url_datos_meteo).subscribe( // Get datos meteorologicos brutos y metelo en meteoData
              response => {
                const meteoData = response;
                this.codigo_n_datos_meteo.codigo = this.id_municipioSelected;
                this.codigo_n_datos_meteo.datosMeteoHoy = meteoData[0].prediccion.dia[0];
                this.codigo_n_datos_meteo.datosMeteoManana = meteoData[0].prediccion.dia[1];
                this.codigo_n_datos_meteo.datosMeteoPasado = meteoData[0].prediccion.dia[2];
                
                console.log(this.codigo_n_datos_meteo)

                this.meteorologiaService.saveMeteoData(this.codigo_n_datos_meteo).subscribe(
                  response=> {
                    console.log(response)
                    this.messageService.add({ severity: 'success', summary: 'Datos actualizados'})
                  }
                )
              }
            )
          }
        )
      }
    )   
  }

  // Función que obtiene los datos y los representa
  ObtenerDatosMeteo(id_municipioSelected: string) {
    this.meteorologiaService.getMeteoDataDB(id_municipioSelected).subscribe(
      response => {
        this.datos_meteo_para_representar = response;
        this.messageService.add({ severity: 'success', summary: 'Datos obtenidos correctamente'})
        this.showDatosMeteo = true;

        //console.log(this.datos_meteo_para_representar)

        const arrayTemperaturasHorariasHoy: number[] = this.datos_meteo_para_representar.temp_horas_hoy.map(item=>item.valor)
        console.log(arrayTemperaturasHorariasHoy)

        this.data = {
            labels: ['6:00', '12:00', '18:00', '24:00'],
            datasets: [
                {
                    data: arrayTemperaturasHorariasHoy,
                    fill: true,
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.2
                }
            ]
        };
        console.log(this.data)
      }
    )
  }
}


