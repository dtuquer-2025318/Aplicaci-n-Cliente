import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // AGREGA /api AQUÍ PARA QUE COINCIDA CON TU EXPRESS:
  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  saveCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }
}