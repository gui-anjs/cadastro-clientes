import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Importações do Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
// NOVOS IMPORTS DO CALENDÁRIO
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatDatepickerModule, // ADICIONADO AQUI
    MatNativeDateModule  // ADICIONADO AQUI
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {
  clienteForm: FormGroup;
  clienteId: string | null = null;
  modoEdicao: boolean = false;

  // Lista com todos os estados brasileiros
  ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Validando para aceitar apenas números no formulário
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      dataNascimento: ['', Validators.required],
      uf: ['', Validators.required],
      municipio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('id');
    
    if (this.clienteId) {
      this.modoEdicao = true;
      this.carregarClienteParaEdicao(this.clienteId);
    }
  }

  carregarClienteParaEdicao(id: string) {
    this.clienteService.getClienteById(id).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue(cliente);
      },
      error: (erro) => console.error('Erro ao carregar cliente para edição', erro)
    });
  }

  // Função disparada ao digitar no campo CPF para bloquear letras
  somenteNumeros(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false; // Bloqueia a tecla se não for número
    }
    return true;
  }

  onSubmit() {
    // Se o formulário for inválido, interrompe o envio
    if (this.clienteForm.invalid) return;

    const clienteData: Cliente = this.clienteForm.value;

    if (this.modoEdicao && this.clienteId) {
      this.clienteService.atualizarCliente(this.clienteId, clienteData).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/']); // Retorna à consulta
        },
        error: (erro) => console.error('Erro ao atualizar cliente', erro)
      });
    } else {
      this.clienteService.salvarCliente(clienteData).subscribe({
        next: () => {
          alert('Cliente cadastrado com sucesso!');
          this.router.navigate(['/']); // Retorna à consulta
        },
        error: (erro) => console.error('Erro ao cadastrar cliente', erro)
      });
    }
  }

  limpar() {
    this.clienteForm.reset();
  }
}