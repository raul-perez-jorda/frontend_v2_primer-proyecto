import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TelefonoService } from './telefono.service';
import { ClienteService } from '../cliente.service';
import { Telefono, Consumo, NuevoTelefono } from './telefono';
import { format } from 'date-fns';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})

export class TelefonoComponent implements OnInit {

  @Input() id_cli !: number;
  ocultarGrafica!: boolean;

  telefonos: Telefono[] = [];

  consumos: Consumo[] = [];

  telefonoForm = this.fb.group({
    telefono: ["", Validators.required],
    descripc_tel:[""],
  });

  nuevo_telefono: NuevoTelefono = {
    id_cli: 0,
    telefono: '',
    descripc_tel: ''
  }

  //Parametros de las graficas
  data: any;
  basicData: any;
  options: any;
  basicOptions: any;
  labels_ejex: any;
  data_consumos: any;

  consumo_avg!: number;
  consumo_max!: number;
  consumo_min!: number;
  
  constructor(
    private fb: FormBuilder, 
    private telefonoService: TelefonoService, 
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getTelefonoList();
    this.ocultarGrafica = true;

  }

  getTelefonoList() {
    console.log(this.id_cli);
    this.telefonoService.getTelefonos(this.id_cli).subscribe(
      response => {
        this.telefonos = response;
      }
    )
  }

  addTelefono() {
    this.nuevo_telefono = {
      "id_cli": this.id_cli, 
      "telefono" : `${this.telefonoForm.value.telefono}`, 
      "descripc_tel": `${this.telefonoForm.value.descripc_tel}`
    };

    this.clienteService.saveTelefono(this.nuevo_telefono).subscribe(
      responseTelefono => {
        console.log(responseTelefono)
      },
      errorTelefono => {
        console.error(errorTelefono);
      }
    )
  }

  getConsumosTelefono(id_tel:number, id_cli:number) {
    this.ocultarGrafica = false;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log("cliente: "+this.id_cli+'\ntelefono: '+id_tel);

    this.telefonoService.getConsumos(this.id_cli, id_tel).subscribe(
      response => {
        this.consumos = response;

        // Mostrar grafica de consumos de cada mes
        this.data_consumos = this.consumos.map(el => el.consumo)

        function convertirFormatoFecha(fecha:Date) {
          const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          const fechaObj = new Date(fecha);
          const nombreMes = meses[fechaObj.getMonth()];       
          const año = fechaObj.getFullYear();       
          const fechaFormateada = `${nombreMes}.${año}`;        
          return fechaFormateada;
        }

        this.labels_ejex = this.consumos.map((el: Consumo) => convertirFormatoFecha(el.fecha));

        this.data = {
            labels: this.labels_ejex,
            datasets: [
                {
                    label: 'Consumos',
                    data: this.data_consumos,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
        
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };


        // Mostrar grafica de media, consumo máximo y mínimo
        this.consumo_avg = eval(this.data_consumos.join('+'))/this.data_consumos.length
        this.consumo_max = Math.max.apply(Math, this.data_consumos)
        this.consumo_min = Math.min.apply(Math, this.data_consumos)

        this.basicData = {
          labels: ['Media', 'Max.', 'Mín.'],
          datasets: [
            {
                label: 'Estadísticas',
                data: [this.consumo_avg, this.consumo_max, this.consumo_min],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1.5
                
            }
          ]
        };

        this.basicOptions = {
          plugins: {
            title: {
              display: true,
              text: 'Estadísticas',
              align: 'center',
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: {
                top: 10,
              }
            },
            legend: {
              display: false, // Establece display en false para ocultar el legend
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem:any) {
                return tooltipItem.yLabel;
              },
            },
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
        };
      }
    )
    

    
  }
}
