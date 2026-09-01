import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QuadrasService, Quadra } from '../../services/quadras';
import { ClientesService, Cliente } from '../../services/clientes';
import {
  AgendamentosService,
  Agendamento
} from '../../services/agendamentos';


@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.css'
})
export class Agendamentos implements OnInit {

  agendamentos: Agendamento[] = [];

  clienteId: number | null = null;
  quadraId: number | null = null;
  data = '';
  hora = '';

  mensagemErro = '';

  quadras: Quadra[] = [];
  clientes: Cliente[] = [];

  constructor(
  private quadrasService: QuadrasService,
  private clientesService: ClientesService,
  private agendamentosService: AgendamentosService
) {}

  ngOnInit(): void {
  this.carregarQuadras();
  this.carregarClientes();
  this.carregarAgendamentos();
}

  carregarAgendamentos(): void {

    this.agendamentosService.listar().subscribe({

      next: (agendamentos) => {
        this.agendamentos = agendamentos;
      },

      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
        this.mensagemErro = 'Erro ao carregar agendamentos.';
      }

    });

  }

  carregarQuadras(): void {

    this.quadrasService.listar().subscribe({

      next: (quadras) => {
        this.quadras = quadras;
      },

      error: (erro) => {
        console.error('Erro ao carregar quadras:', erro);
      }

    });

  }

  carregarClientes(): void {

  this.clientesService.listar().subscribe({

    next: (clientes) => {
      this.clientes = clientes;
    },

    error: (erro) => {
      console.error('Erro ao carregar clientes:', erro);
    }

  });

}

  adicionarAgendamento(): void {

  this.mensagemErro = '';

  if (
    this.clienteId === null ||
    this.quadraId === null ||
    this.data === '' ||
    this.hora === ''
  ) {

    this.mensagemErro = 'Preencha todos os campos.';
    return;

  }

  const novoAgendamento = {
    cliente_id: this.clienteId,
    quadra_id: this.quadraId,
    data: this.data,
    hora: this.hora
  };

  this.agendamentosService
    .cadastrar(novoAgendamento)
    .subscribe({

      next: () => {

        this.limparFormulario();
        this.carregarAgendamentos();

      },

      error: (erro) => {

        console.error(erro);

        if (erro.status === 409) {

          this.mensagemErro =
            'Esta quadra já está agendada para esta data e horário.';

        } else {

          this.mensagemErro =
            erro.error?.mensagem ||
            'Erro ao criar agendamento.';

        }

      }

    });

}

  excluirAgendamento(id: number): void {

  this.agendamentosService.excluir(id).subscribe({

    next: () => {
      this.carregarAgendamentos();
    },

    error: (erro) => {

      console.error(erro);

      this.mensagemErro =
        erro.error?.mensagem ||
        'Erro ao excluir agendamento.';

    }

  });

}

  limparFormulario() {

    this.clienteId = null;
    this.quadraId = null;
    this.data = '';
    this.hora = '';

  }

}
