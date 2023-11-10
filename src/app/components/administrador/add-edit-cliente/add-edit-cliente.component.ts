import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { RespuestaCliente, Cliente } from '../../../interfaces/cliente';
import { NuevoTelefono } from '../../../interfaces/telefono';

@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnChanges {

  @Input() displayAddModal: boolean = true;
  @Input() modo_editar: boolean = false;
  @Input() clienteSelected!: Cliente;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  clienteForm = this.fb.group({
    nombre: ["", Validators.required],
    email:[""],
    telefono: [""],
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes['displayAddModal'] && changes['displayAddModal'].currentValue) {
      if(this.modo_editar) {
        this.clienteForm.patchValue({
          nombre: this.clienteSelected.nombre,
          email: this.clienteSelected.email,
        })
      }
      else {
        this.clienteForm.patchValue({
          nombre: '',
          email: '',
        })
      }
    }
    
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

  editClient() {
    this.clienteService.updateCliente(this.clienteSelected.id_cli, this.clienteForm.value).subscribe(
      response => {
        this.clienteRes = response;
        console.log(response);

        this.modo_editar=false;

        this.clienteForm.reset();
        this.clickClose.emit(true);
      }
    )
  }

  closeModal() {
    this.clickClose.emit(true);
  }

}
