import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TelefonoService } from './telefono.service';
import { ClienteService } from '../cliente.service';
import { Telefono } from './telefono';
import { NuevoTelefono } from '../telefono/telefono';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})

export class TelefonoComponent implements OnInit {

  @Input() id_cli !: number;

  telefonos: Telefono[] = [];

  telefonoForm = this.fb.group({
    telefono: ["", Validators.required],
    descripc_tel:[""],
  });

  nuevo_telefono: NuevoTelefono = {
    id_cli: 0,
    telefono: '',
    descripc_tel: ''
  }
  
  constructor(private fb: FormBuilder, private telefonoService: TelefonoService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getTelefonoList();
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
}
