import { Component } from '@angular/core';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClienteFormComponent, ClienteListComponent],
  template: `
    <main style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1>Módulo de Clientes – CONRED</h1>
      <hr style="margin-bottom: 2rem;">
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <app-cliente-form (clienteRegistrado)="listComponent.cargarClientes()"></app-cliente-form>
        </div>
        <div style="flex: 2; min-width: 450px;">
          <app-cliente-list #listComponent></app-cliente-list>
        </div>
      </div>
    </main>
  `
})
export class AppComponent {}