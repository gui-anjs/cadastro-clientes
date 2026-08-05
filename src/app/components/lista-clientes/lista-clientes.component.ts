import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importações do Material Design que o seu HTML usa
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, // Faz o campo de pesquisa funcionar
    MatInputModule      // Faz o input de texto funcionar
  ],
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {
  
  // O Angular Material usa o MatTableDataSource para conseguir filtrar (pesquisar) dados
  dataSource = new MatTableDataSource<Cliente>();
  
  // O nome exato que o seu HTML está pedindo para listar as colunas
  // Obs: Adicionei 'acoes' no final caso você tenha botões de editar/deletar na tabela
  colunas: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (dados) => {
        this.dataSource.data = dados; // Entrega os dados pro dataSource desenhar a tabela
      },
      error: (erro) => console.error('Erro ao buscar clientes', erro)
    });
  }

  // Função para a barra de pesquisa que você tem no HTML
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Função para o botão de apagar corrigida
  deletarCliente(id: string) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      // Mudamos de 'excluirCliente' para 'deletarCliente' (ou ajuste para o nome exato do seu service)
      this.clienteService.deletarCliente(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.carregarClientes(); 
        },
        error: (erro: any) => console.error('Erro ao excluir cliente', erro) // Adicionado o ': any'
      });
    }
  }

  // A função que formata o CPF!
  formatarCpf(cpf: string): string {
    if (!cpf) return '';
    const cpfLimpo = cpf.replace(/\D/g, ''); 
    if (cpfLimpo.length === 11) {
      return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }
}