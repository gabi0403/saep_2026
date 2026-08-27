import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Agendamento {
  id: number;
  cliente: string;
  quadra: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.css'
})
export class Agendamentos {

  agendamentos: Agendamento[] = [];

  cliente = '';
  quadra = '';
  data = '';
  hora = '';

  mensagemErro = '';

  quadras = [
    'Tênis',
    'Beach Tennis',
    'Futebol Society',
    'Vôlei de Praia',
    'Basquete'
  ];

  adicionarAgendamento() {

    if (
      this.cliente.trim() === '' ||
      this.quadra === '' ||
      this.data === '' ||
      this.hora === ''
    ) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      cliente: this.cliente,
      quadra: this.quadra,
      data: this.data,
      hora: this.hora
    };

    this.agendamentos.push(novoAgendamento);

    this.limparFormulario();
    this.mensagemErro = '';
  }

  excluirAgendamento(id: number) {

    this.agendamentos = this.agendamentos.filter(
      agendamento => agendamento.id !== id
    );
  }

  limparFormulario() {

    this.cliente = '';
    this.quadra = '';
    this.data = '';
    this.hora = '';
  }
}