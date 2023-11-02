import { Component } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  clientes: Cliente[] = [];
  clienteSelected: Cliente = {
    id_cli: 0,
    nombre: '',
    email: '',

  };
  displayAddModal = false;
  displayTelefonos = false;
  modo_editar = false;
  idSelected!: number;
  
  constructor(private clienteService: ClienteService ) { }

  ngOnInit(): void {
    this.getClienteList();

  }

  getClienteList() {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response;
      }
    )
  }

  showAddModal() {
    this.displayAddModal = true;
    this.modo_editar = false;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
    this.getClienteList();
  }

  showTelefonos( id_cli: number ) {
    this.idSelected = id_cli;
    this.displayTelefonos = true;
  }

  editClient( cliente: Cliente ) {
    this.clienteSelected = cliente;
    this.displayAddModal = true;
    this.modo_editar = true;
  }

  deleteClient( id_cli: number ) {
    this.clienteService.eliminaCliente(id_cli).subscribe(
      responseElimina => {
        console.log(responseElimina);
        this.getClienteList();
      }
    );
  }

}
