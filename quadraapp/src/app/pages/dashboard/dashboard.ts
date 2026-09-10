import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, take, timeout } from 'rxjs/operators';

import { ClientesService, Cliente } from '../../services/clientes';
import { QuadrasService, Quadra } from '../../services/quadras';
import { AgendamentosService, Agendamento } from '../../services/agendamentos';
import { AuthService } from '../../services/auth';

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
  agendamentos: Agendamento[] = [];
  carregando = false;
  mensagemErro = '';
  usuario = '';

  constructor(
    private clientesService: ClientesService,
    private quadrasService: QuadrasService,
    private agendamentosService: AgendamentosService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuarioAtual()?.usuario || '';
    this.carregarDados();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  carregarDados(): void {
    this.carregando = true;
    this.mensagemErro = '';

    forkJoin({
      clientes: this.clientesService.listar().pipe(take(1), timeout(5000)),
      quadras: this.quadrasService.listar().pipe(take(1), timeout(5000)),
      agendamentos: this.agendamentosService.listar().pipe(take(1), timeout(5000))
    }).pipe(
      catchError((erro) => {
        console.error('Erro ao carregar dados do dashboard:', erro);
        this.mensagemErro = 'Não foi possível carregar os dados do dashboard.';
        this.changeDetectorRef.detectChanges();
        return of({
          clientes: [] as Cliente[],
          quadras: [] as Quadra[],
          agendamentos: [] as Agendamento[]
        });
      }),
      finalize(() => {
        this.carregando = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe(({ clientes, quadras, agendamentos }) => {
      this.totalClientes = clientes.length;
      this.totalQuadras = quadras.length;
      this.totalAgendamentos = agendamentos.length;
      this.agendamentos = agendamentos.slice(0, 5);
      this.changeDetectorRef.detectChanges();
    });

  }
}
