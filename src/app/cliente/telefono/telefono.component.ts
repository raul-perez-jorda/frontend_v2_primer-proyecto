import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TelefonoService } from './telefono.service';
import { EmailService } from '../email/email.service';
import { ClienteService } from '../cliente.service';
import { Telefono, Consumo, NuevoTelefono, NuevoConsumo, Estadisticas, DatosCorreo } from './telefono';

import * as Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})

export class TelefonoComponent implements OnInit, AfterViewInit {

  @Input() id_cli !: number;

  @ViewChild('chartConsumo') chartConsumo!: ElementRef;
  @ViewChild('chartEstadisticas') chartEstadisticas!: ElementRef;

  ocultarGrafica!: boolean;

  telefonos: Telefono[] = [];

  consumos: Consumo[] = [];

  telefonoForm = this.fb.group({
    telefono: ["", Validators.required],
    descripc_tel:[""],
  });

  consumoForm = this.fb.group({
    consumo: [0, Validators.required],
    fecha:[new Date(), Validators.required],
  });

  nuevo_telefono: NuevoTelefono = {
    id_cli: 0,
    telefono: '',
    descripc_tel: ''
  }

  nuevo_consumo: NuevoConsumo = {
    id_cli: 0,
    id_tel: 0,
    consumo: 0,
    fecha: ''
  }

  estadisticas: Estadisticas = {
    media_consumo: 0,
    max_consumo: 0,
    min_consumo: 0
  }

  datos_correo: DatosCorreo = {
    pdf_path: '',
    destinatario: '',
    pdf: new jsPDF()
  }

  clienteSelected!: number;
  telefonoSelected!: number;
  inputNuevaFecha!: Date;


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

  displayChart !: boolean;

  email!: string;
  doc = new jsPDF;
  descargar_pdf = false;
  
  constructor(
    private fb: FormBuilder, 
    private telefonoService: TelefonoService, 
    private clienteService: ClienteService,
    private emailService: EmailService) { }

  convertirFormatoFecha(fecha:Date) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const fechaObj = new Date(fecha);
    const nombreMes = meses[fechaObj.getMonth()];       
    const año = fechaObj.getFullYear();       
    const fechaFormateada = `${nombreMes}.${año}`;        
    return fechaFormateada;
  }

  ngOnInit(): void {
    this.getTelefonoList();
    this.ocultarGrafica = true;
  }

  ngAfterViewInit() {
    
  }

  getTelefonoList() {
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

    this.telefonoForm.reset();
    location.reload();
  }

  getConsumosTelefono(id_tel:number, id_cli:number) {
    this.displayChart = false
    this.clienteSelected= this.id_cli
    this.telefonoSelected= id_tel

    this.ocultarGrafica = false;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log("cliente: "+this.clienteSelected+'\ntelefono: '+this.telefonoSelected);

    this.telefonoService.getConsumos(this.id_cli, id_tel).subscribe(
      response => {
        this.consumos = response;

        // Mostrar grafica de consumos de cada mes
        this.data_consumos = this.consumos.map(el => el.consumo)

        this.labels_ejex = this.consumos.map((el: Consumo) => this.convertirFormatoFecha(el.fecha));

        console.log(this.data_consumos)

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
              plugins: {
                title: {
                  display: true,
                  text: 'Consumos',
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
            },
        }

        this.telefonoService.getEstadisticasConsumo(this.id_cli, id_tel).subscribe(
          responseEstadisticas => {
            if(responseEstadisticas.length>0) {
              this.estadisticas = responseEstadisticas[0];
              console.log(this.estadisticas)

              this.basicData = {
                labels: ['Media', 'Max.', 'Mín.'],
                datasets: [
                  {
                      label: 'Estadísticas',
                      data: [this.estadisticas.media_consumo, this.estadisticas.max_consumo, this.estadisticas.min_consumo],
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
            else {
              console.error('El array de estadisticas esta vacio')
            }            
          }
        );        

        this.displayChart = true

      }
    )   

    
  }

  addConsumo(inputNuevaFecha: Date, id_tel:number) {
    this.nuevo_consumo = {
      id_cli: this.id_cli,
      id_tel: id_tel,
      fecha:  inputNuevaFecha.toLocaleDateString("fr-CA"),
      consumo: this.nuevo_consumo.consumo,
    }    

    this.clienteService.saveConsumo(this.nuevo_consumo).subscribe(
      responseConsumo => {
        console.log(responseConsumo)

        this.getConsumosTelefono(this.nuevo_consumo.id_cli, this.nuevo_consumo.id_tel);
      }
    );
    
  }

  generarPDF(descargar_pdf:boolean): void {
    const chartConsumo = document.getElementById('chartConsumo');
    const chartEstadisticas = document.getElementById('chartEstadisticas');
    const tablaConsumos = document.getElementById('tablaConsumos');
 
    if(chartConsumo && chartEstadisticas && tablaConsumos){
 
      html2canvas(chartConsumo).then(canvas => {
        this.doc = new jsPDF
        const imgData = canvas.toDataURL('image/png');
        const imgProps = this.doc.getImageProperties(imgData);
        const pdfWidth = this.doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        this.doc.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      });

      html2canvas(chartEstadisticas).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = this.doc.getImageProperties(imgData);
        const pdfWidth = this.doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        this.doc.addImage(imgData, 'PNG', 0, pdfHeight+50, pdfWidth, pdfHeight);
        this.doc.addPage()
      });

      html2canvas(tablaConsumos).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = this.doc.getImageProperties(imgData);
        const pdfWidth = this.doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        this.doc.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
        if (descargar_pdf==true){
          this.doc.save('archivo'+new Date()+'.pdf');
        }
      });
    } else {
      console.error('Elemento con ID chartConsumo no encontrado.');
      const pdf = new jsPDF();
    }

  }

  enviarConsumosCorreo(clienteSelected:number) {
    console.log(clienteSelected)
    this.clienteService.getCliente(clienteSelected).subscribe(
      responseEmail => {
        this.datos_correo.destinatario = responseEmail[0].email;
        this.datos_correo.pdf_path = '/mnt/c/Users/rperez/Downloads/archivo.pdf'

        this.generarPDF(true)
        this.datos_correo.pdf = this.doc

        console.log(this.datos_correo)

        this.emailService.enviarCorreo(this.datos_correo).subscribe(
          responseSend => {
            console.log("Email enviado correctamente:", responseSend);
          },
          errorSend => {
            console.error("Error al enviar email:", errorSend)
          }
        )
      }
    )
  }
  
}
