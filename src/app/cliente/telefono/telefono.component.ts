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
  aun_vacio = false; //de primeras no se sabe si esta lleno o vacio

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
    nombre_archivo: ''
  }

  clienteSelected!: number;
  telefonoSelected = 0;
  inputNuevaFecha!: Date;


  //Parametros de las graficas
  data: any;
  basicData: any;
  labels_ejex: any;
  data_consumos: any;

  consumo_avg!: number;
  consumo_max!: number;
  consumo_min!: number;

  displayChart !: boolean;

  // Variables para el aspecto gráfico de las gráficas
  documentStyle = getComputedStyle(document.documentElement);
    textColor = this.documentStyle.getPropertyValue('--text-color');
    textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  options = {
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
            }
        }
    },
}
  basicOptions = {
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
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            }
        },
        x: {
            ticks: {
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            }
        }
    }
  };

  email!: string;
  doc = new jsPDF;
  descargar_pdf = false;
  nombre_archivo = '';
  
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
    

    console.log("cliente: "+this.clienteSelected+'\ntelefono: '+this.telefonoSelected);

    this.telefonoService.getConsumos(this.id_cli, id_tel).subscribe(
      response => {
        this.consumos = response;
        console.log(this.consumos)


        // Mostrar grafica de consumos de cada mes
        this.data_consumos = this.consumos.map(el => el.consumo)

        this.labels_ejex = this.consumos.map((el: Consumo) => this.convertirFormatoFecha(el.fecha));


        this.data = {
            labels: this.labels_ejex,
            datasets: [
                {
                    label: 'Consumos',
                    data: this.data_consumos,
                    fill: false,
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };       

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
              
              if (this.labels_ejex.length > 0) {
                this.displayChart = true
                this.aun_vacio = false
              }
              else {
                this.displayChart = false
                this.aun_vacio = true
              }
            }
            else {
              console.log('El array de estadisticas esta vacio')
            }              
          }
        );            
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

  generarPDF(descargar_pdf:boolean, telefonoSelected:number): void {
    const chartConsumo = document.getElementById('chartConsumo');
    const chartEstadisticas = document.getElementById('chartEstadisticas');
    const tablaConsumos = document.getElementById('tablaConsumos');

    this.nombre_archivo = 'consumos_'+telefonoSelected+'.pdf';
 
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
          this.doc.save(this.nombre_archivo);
        }
      });
    } else {
      console.error('Elemento con ID chartConsumo no encontrado.');
      const pdf = new jsPDF();
    }

  }

  enviarConsumosCorreo(clienteSelected:number, telefonoSelected:number) {
    console.log(clienteSelected)
    this.clienteService.getCliente(clienteSelected).subscribe(
      responseEmail => {
        this.datos_correo.destinatario = responseEmail[0].email;

        this.generarPDF(true, telefonoSelected)
        this.datos_correo.pdf_path = '/mnt/c/Users/rperez/Downloads/'+this.nombre_archivo
        this.datos_correo.nombre_archivo = this.nombre_archivo


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
