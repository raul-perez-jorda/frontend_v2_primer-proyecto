import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TelefonoService } from '../../../services/telefono.service';
import { EmailService } from '../../../services/email.service';
import { ClienteService } from '../../../services/cliente.service';
import { Telefono, Consumo, NuevoTelefono, NuevoConsumo, Estadisticas, DatosCorreo } from '../../../interfaces/telefono';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

import * as Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { delay } from 'rxjs';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})

export class TelefonoComponent implements OnInit, AfterViewInit {

  @Input() id_cliSelected !: number;

  @ViewChild('chartConsumo') chartConsumo!: ElementRef;
  @ViewChild('chartEstadisticas') chartEstadisticas!: ElementRef;

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
  telefonoSelected!: Telefono;
  id_telSelected = 0;
  inputNuevaFecha!: Date;
  id_consumoSelected!: number;

  //Parametros de las graficas
  data: any;
  basicData: any;
  labels_ejex: any;
  data_consumos: any;

  consumo_avg!: number;
  consumo_max!: number;
  consumo_min!: number;

  //Variables booleanas
  aun_vacio = false; //de primeras no se sabe si esta lleno o vacio
  displayChart !: boolean;
  modo_editar_telefono = false;
  modo_editar_consumo = false;

  email!: string;
  doc = new jsPDF;
  descargar_pdf = false;
  nombre_archivo = '';
  dateStamp = '';


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


  
  constructor(
    private fb: FormBuilder, 
    private telefonoService: TelefonoService, 
    private clienteService: ClienteService,
    private emailService: EmailService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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
  }

  ngAfterViewInit() {
    
  }

  getTelefonoList() {
    this.telefonoService.getTelefonos(this.id_cliSelected).subscribe(
      response => {
        this.telefonos = response;
      }
    )
  }

  addTelefono() {
    this.nuevo_telefono = {
      "id_cli": this.id_cliSelected, 
      "telefono" : `${this.telefonoForm.value.telefono}`, 
      "descripc_tel": `${this.telefonoForm.value.descripc_tel}`
    };

    this.clienteService.saveTelefono(this.nuevo_telefono).subscribe(
      responseTelefono => {
        console.log(responseTelefono)

        this.getTelefonoList();
      },
      errorTelefono => {
        console.error(errorTelefono);
      }
    )

    this.telefonoForm.reset();
  }

  mostrarEditarTelefono(telefonoSelected: Telefono) {
    this.modo_editar_telefono = true
    this.id_telSelected = telefonoSelected.id_tel

    this.telefonoForm.patchValue({
      telefono: telefonoSelected.telefono,
      descripc_tel: telefonoSelected.descripc_tel
    })
  }

  mostrarEditarConsumo(consumoSelected: Consumo) {
    this.modo_editar_consumo = true
    this.id_consumoSelected = consumoSelected.id_consumo

    this.nuevo_consumo.consumo= consumoSelected.consumo
    this.inputNuevaFecha = consumoSelected.fecha
  }

  editarTelefono(modo: boolean, id_telSelected:number){
    if (modo==true) {
      this.telefonoService.updateTelefono(id_telSelected, this.telefonoForm.value).subscribe(
        responsePut => {
          console.log(responsePut)

          this.getTelefonoList()
        }
      )
    }
    this.telefonoForm.reset()
    this.modo_editar_telefono = false
    this.telefonoForm.patchValue({
      telefono: '',
      descripc_tel: ''
    })
  }

  eliminaTelefono(id_tel: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Teléfono eliminado' });

          this.telefonoService.deleteTelefono(id_tel).subscribe(
            responseDelete => {
              console.log(responseDelete)
      
              //location.reload()
              this.confirmationService.close();
              this.getTelefonoList();
            }
          )
      },
      reject: () => {
        //location.reload()
        this.confirmationService.close();

      }
    });        
  }

  eliminaConsumo(id_consumo: number) {
    this.telefonoService.deleteConsumo(id_consumo).subscribe(
      responseDelete => {
        console.log(responseDelete)
        this.getConsumosTelefono(this.telefonoSelected)
      },
      errorDelete => {
        console.error(errorDelete)
      }
    )    
  }

  getConsumosTelefono(telefono: Telefono) {
    this.displayChart = false
    this.clienteSelected= this.id_cliSelected
    this.id_telSelected= telefono.id_tel
    this.telefonoSelected = telefono;
    
    this.telefonoService.getConsumos(this.id_cliSelected, this.id_telSelected).subscribe(
      response => {
        this.consumos = response;

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

        this.telefonoService.getEstadisticasConsumo(this.id_cliSelected, this.id_telSelected).subscribe(
          responseEstadisticas => {
            if(responseEstadisticas.length>0) {
              this.estadisticas = responseEstadisticas[0];

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
              this.displayChart = true
              this.aun_vacio = false
            }
            else {
              console.log('El array de estadisticas esta vacio')
              this.displayChart = false
              this.aun_vacio = true
            }              
          }
        );            
      }
    )   
  }

  addConsumo(inputNuevaFecha: Date, id_tel:number) {
    this.nuevo_consumo = {
      id_cli: this.id_cliSelected,
      id_tel: id_tel,
      fecha:  inputNuevaFecha.toLocaleDateString("fr-CA"),
      consumo: this.nuevo_consumo.consumo,
    }

    this.clienteService.saveConsumo(this.nuevo_consumo).subscribe(
      responseConsumo => {
        console.log(responseConsumo)

        this.getConsumosTelefono(this.telefonoSelected);
      }
    );
  }

  editarConsumo(modo: boolean, id_consumo:number, id_tel:number, inputNuevaFecha:Date){
    this.nuevo_consumo = {
      id_cli: this.id_cliSelected,
      id_tel: id_tel,
      fecha:  inputNuevaFecha.toLocaleDateString("fr-CA"),
      consumo: this.nuevo_consumo.consumo,
    }
    console.log(this.nuevo_consumo)

    if (modo==true) {
      this.telefonoService.updateConsumo(this.id_consumoSelected, this.nuevo_consumo).subscribe(
        responsePut => {
          console.log(responsePut)

          this.getConsumosTelefono(this.telefonoSelected)
        }
      )
    }
    this.consumoForm.reset()
    this.modo_editar_consumo = false
    this.consumoForm.patchValue({
      consumo: 0,
      fecha: new Date()
    })
  }

  generarPDF(descargar_pdf: boolean, num_telefono:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const chartConsumo = document.getElementById('chartConsumo');
      const chartEstadisticas = document.getElementById('chartEstadisticas');
      const tablaConsumos = document.getElementById('tablaConsumos');
  
      this.dateStamp = new Date().getTime().toString();
      this.nombre_archivo = 'consumos_' + this.dateStamp + '.pdf';
  
      if (chartConsumo && chartEstadisticas && tablaConsumos) {
        this.doc = new jsPDF();
        this.agregarCabecera(num_telefono)

        html2canvas(chartConsumo).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgProps = this.doc.getImageProperties(imgData);
          const pdfWidth = this.doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          this.doc.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
        });
  
        html2canvas(chartEstadisticas).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgProps = this.doc.getImageProperties(imgData);
          const pdfWidth = this.doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          this.doc.addImage(imgData, 'PNG', 0, pdfHeight + 50, pdfWidth, pdfHeight);
          this.doc.addPage();
        });
  
        html2canvas(tablaConsumos).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgProps = this.doc.getImageProperties(imgData);
          const pdfWidth = this.doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          this.doc.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
          if (descargar_pdf == true) {
            // Simula el tiempo de descarga con un delay de 5 segundos
            setTimeout(() => {
              this.doc.save(this.nombre_archivo);
              console.log("PDF guardado correctamente");
              resolve();
            }, 3000);
          } else {
            resolve();
          }
        });
      } else {
        console.error('Elemento con ID chartConsumo no encontrado.');
        reject("Elemento no encontrado");
      }
    });
  }
  

  enviarConsumosCorreo(clienteSelected:number, num_telefono: string) {
    this.clienteService.getCliente(clienteSelected).subscribe(
      responseEmail => {
        this.datos_correo.destinatario = responseEmail[0].email;
        
        this.messageService.add({ severity: 'info', summary: 'Enviando...', detail: 'Redactando email' })

        this.generarPDF(true, num_telefono)
          .then(() => {
            this.datos_correo.pdf_path = '/mnt/c/Users/rperez/Downloads/'+this.nombre_archivo
            this.datos_correo.nombre_archivo = this.nombre_archivo
            
            this.emailService.enviarCorreo(this.datos_correo).subscribe(
              responseSend => {
                console.log("Email enviado correctamente:", responseSend);
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Correo enviado' })
              },
              errorSend => {
                console.error("Error al enviar email:", errorSend)
                this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Fallo al enviar el correo' })
              }
            )
          })
          .catch(error => {
            console.error("Error al generar PDF:", error);
          })
      }
    )
  }

  agregarCabecera(num_telefono: string): void {
    const cabecera = `Datos consumo del telefono ${num_telefono}`;
    this.doc.text(cabecera, 10, 10);
  }
  
}
