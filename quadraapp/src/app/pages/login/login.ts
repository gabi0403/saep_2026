import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  senha = '';

  mensagemErro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar() {

    this.mensagemErro = '';

    if (!this.usuario || !this.senha) {
      this.mensagemErro = 'Usuário e senha são obrigatórios.';
      return;
    }

    this.authService.login(this.usuario, this.senha).subscribe({

      next: (resposta) => {

        console.log(resposta);

        this.router.navigate(['/dashboard']);

      },

      error: (erro) => {

        console.error(erro);

        this.mensagemErro =
          erro.error?.mensagem || 'Erro ao realizar login.';

      }

    });

  }

}