import { Component } from '@angular/core';
import { Api } from '../../service/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //atributos
  credencial = {login:"", senha:""};

  constructor(private api: Api, private router: Router){}

  entrar(){
    this.api.login(this.credencial).subscribe({
      next: (usuario) =>{
        //armazenar no localStorage (cache do navegador)
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        // Navegar para a página Home
        this.router.navigate(["/home"]);
      },
      //verificar erro
      error: () => {
        alert(`Falha de autenticação. Usuário ou Senha incorretos`);
      }
    });
  }


}
