import { Component } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ConfirmationService, MessageService]
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
  id_cliSelected!: number;
  
  constructor(private clienteService: ClienteService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
    this.id_cliSelected = id_cli;
    this.displayTelefonos = true;
  }

  editClient( cliente: Cliente ) {
    this.clienteSelected = cliente;
    this.displayAddModal = true;
    this.modo_editar = true;
  }

  deleteClient( id_cli: number ) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Cliente eliminado' });

          this.clienteService.eliminaCliente(id_cli).subscribe(
            responseElimina => {
              console.log(responseElimina);
              this.confirmationService.close();
              this.getClienteList();
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
    });    
  }

}
