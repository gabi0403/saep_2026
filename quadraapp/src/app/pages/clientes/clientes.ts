import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientesService, Cliente } from '../../services/clientes';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-clientes',
  imports: [FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  clientes: Cliente[] = [];

  nome = '';
  telefone = '';
  email = '';
  busca = '';

  mensagem = '';
  mensagemErro = '';

  clienteEditando: Cliente | null = null;

  constructor(
    private clientesService: ClientesService,
    private authService: AuthService,
    private router: Router
  ) {}

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

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

  get clientesFiltrados(): Cliente[] {
    const termo = this.busca.trim().toLocaleLowerCase();

    if (!termo) {
      return this.clientes;
    }

    return this.clientes.filter((cliente) =>
      cliente.nome.toLocaleLowerCase().includes(termo) ||
      cliente.email.toLocaleLowerCase().includes(termo)
    );
  }

}
