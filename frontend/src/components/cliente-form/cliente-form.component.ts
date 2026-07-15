import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {
  @Output() clienteRegistrado = new EventEmitter<void>();

  // Ajustado a minúsculas idéntico a PostgreSQL
  cliente: Cliente = {
    codigo_cliente: '',
    nombre_cliente: '',
    direccion_cliente: '',
    telefono: ''
  };

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private clienteService: ClienteService) {}

  onSubmit(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    // Convertimos los datos a las mayúsculas que el backend de Express espera recibir
    const clienteParaBackend = {
      codigo_Cliente: this.cliente.codigo_cliente,
      nombre_Cliente: this.cliente.nombre_cliente,
      direccion_Cliente: this.cliente.direccion_cliente,
      telefono: this.cliente.telefono
    };

    // Enviamos el objeto convertido ("clienteParaBackend") en lugar de "this.cliente"
    this.clienteService.saveCliente(clienteParaBackend as any).subscribe({
      next: (res) => {
        this.mensajeExito = res.message || 'Registrado con éxito.';
        this.cliente = {
          codigo_cliente: '',
          nombre_cliente: '',
          direccion_cliente: '',
          telefono: ''
        };
        this.clienteRegistrado.emit();
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al registrar el cliente.';
      }
    });
  }
}