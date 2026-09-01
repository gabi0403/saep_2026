import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClientesService, Cliente } from '../../services/clientes';
import { QuadrasService, Quadra } from '../../services/quadras';
import { AgendamentosService, Agendamento } from '../../services/agendamentos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalClientes = 0;
  totalQuadras = 0;
  totalAgendamentos = 0;

  constructor(
    private clientesService: ClientesService,
    private quadrasService: QuadrasService,
    private agendamentosService: AgendamentosService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {

    this.clientesService.listar().subscribe({
      next: (clientes: Cliente[]) => {
        this.totalClientes = clientes.length;
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    });

    this.quadrasService.listar().subscribe({
      next: (quadras: Quadra[]) => {
        this.totalQuadras = quadras.length;
      },
      error: (erro) => {
        console.error('Erro ao carregar quadras:', erro);
      }
    });

    this.agendamentosService.listar().subscribe({
      next: (agendamentos: Agendamento[]) => {
        this.totalAgendamentos = agendamentos.length;
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
      }
    });

  }
}