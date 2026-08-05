import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente'; // Confirme se o caminho para a sua interface está correto

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // Essa será a URL da nossa API simulada com JSON Server
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  // C - Create (Salvar um novo cliente)
  salvarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // R - Read (Buscar todos os clientes para a tabela)
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // R - Read (Buscar um cliente específico pelo ID para a edição)
  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // U - Update (Atualizar os dados de um cliente)
  atualizarCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // D - Delete (Excluir um cliente)
  deletarCliente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
