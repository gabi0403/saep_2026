import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {

  clientes: Cliente[] = [];

  nome = '';
  telefone = '';
  email = '';

  editando = false;
  idEditando: number | null = null;

  mensagemErro = '';

  adicionarCliente() {

    if (
      this.nome.trim() === '' ||
      this.telefone.trim() === '' ||
      this.email.trim() === ''
    ) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    if (this.editando && this.idEditando !== null) {

      const cliente = this.clientes.find(
        c => c.id === this.idEditando
      );

      if (cliente) {
        cliente.nome = this.nome;
        cliente.telefone = this.telefone;
        cliente.email = this.email;
      }

      this.cancelarEdicao();

    } else {

      const novoCliente: Cliente = {
        id: Date.now(),
        nome: this.nome,
        telefone: this.telefone,
        email: this.email
      };

      this.clientes.push(novoCliente);

      this.limparFormulario();
    }

    this.mensagemErro = '';
  }

  editarCliente(cliente: Cliente) {

    this.nome = cliente.nome;
    this.telefone = cliente.telefone;
    this.email = cliente.email;

    this.editando = true;
    this.idEditando = cliente.id;

    this.mensagemErro = '';
  }

  excluirCliente(id: number) {

    this.clientes = this.clientes.filter(
      cliente => cliente.id !== id
    );

    if (this.idEditando === id) {
      this.cancelarEdicao();
    }
  }

  cancelarEdicao() {

    this.editando = false;
    this.idEditando = null;

    this.limparFormulario();
  }

  limparFormulario() {

    this.nome = '';
    this.telefone = '';
    this.email = '';
  }
}