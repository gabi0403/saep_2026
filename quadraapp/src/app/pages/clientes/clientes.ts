import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientesService, Cliente } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  imports: [FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  clientes: Cliente[] = [];

  nome = '';
  telefone = '';
  email = '';

  mensagem = '';
  mensagemErro = '';

  clienteEditando: Cliente | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {

    this.clientesService.listar().subscribe({

      next: (clientes) => {
        this.clientes = clientes;
      },

      error: (erro) => {
        console.error(erro);
        this.mensagemErro = 'Erro ao carregar clientes.';
      }

    });

  }

  salvar(): void {

    this.mensagem = '';
    this.mensagemErro = '';

    if (!this.nome || !this.telefone || !this.email) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    const cliente = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email
    };

    if (this.clienteEditando) {

      this.clientesService
        .atualizar(this.clienteEditando.id, cliente)
        .subscribe({

          next: () => {
            this.mensagem = 'Cliente atualizado com sucesso.';
            this.limparFormulario();
            this.carregarClientes();
          },

          error: (erro) => {
            console.error(erro);

            this.mensagemErro =
              erro.error?.mensagem || 'Erro ao atualizar cliente.';
          }

        });

    } else {

      this.clientesService.cadastrar(cliente).subscribe({

        next: () => {
          this.mensagem = 'Cliente cadastrado com sucesso.';
          this.limparFormulario();
          this.carregarClientes();
        },

        error: (erro) => {
          console.error(erro);

          this.mensagemErro =
            erro.error?.mensagem || 'Erro ao cadastrar cliente.';
        }

      });

    }

  }

  editar(cliente: Cliente): void {

    this.clienteEditando = cliente;

    this.nome = cliente.nome;
    this.telefone = cliente.telefone;
    this.email = cliente.email;

  }

  excluir(id: number): void {

    if (!confirm('Deseja realmente excluir este cliente?')) {
      return;
    }

    this.clientesService.excluir(id).subscribe({

      next: () => {
        this.mensagem = 'Cliente excluído com sucesso.';
        this.carregarClientes();
      },

      error: (erro) => {
        console.error(erro);

        this.mensagemErro =
          erro.error?.mensagem || 'Erro ao excluir cliente.';
      }

    });

  }

  limparFormulario(): void {

    this.nome = '';
    this.telefone = '';
    this.email = '';
    this.clienteEditando = null;

  }

}