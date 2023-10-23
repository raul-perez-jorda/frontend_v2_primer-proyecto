import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { RespuestaCliente } from '../cliente';
import { NuevoTelefono } from '../telefono/telefono';

@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnInit {

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  clienteForm = this.fb.group({
    nombre: ["", Validators.required],
    telefono: ["", Validators.required],
    descripc_tel: [""],
  });

  clienteRes:RespuestaCliente = {
    id_cli: 0,
    message: '',
  };

  nuevo_telefono: NuevoTelefono = {
    id_cli: 0,
    telefono: '',
    descripc_tel: ''
  }

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {

  }

  addCliAndTel() {
    this.clienteService.saveCliente(this.clienteForm.value).subscribe(
      response => {
        this.clienteRes = response;
        console.log(response.id_cli);

        this.nuevo_telefono = {
          "id_cli": response.id_cli, 
          "telefono" : `${this.clienteForm.value.telefono}`, 
          "descripc_tel": `${this.clienteForm.value.descripc_tel}`
        };

        this.clienteService.saveTelefono(this.nuevo_telefono).subscribe(
          responseTelefono => {
            console.log(responseTelefono)
          },
          errorTelefono => {
            console.error(errorTelefono);
          }
        )

        this.clienteForm.reset();
        this.clickClose.emit(true);
      }
    )
  }

  closeModal() {
    this.clickClose.emit(true);
  }

}
