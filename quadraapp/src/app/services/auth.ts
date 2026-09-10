import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  mensagem: string;
  usuario: {
    id: number;
    usuario: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        usuario,
        senha
      }
    );
  }

  salvarSessao(resposta: LoginResponse): void {
    localStorage.setItem('quadraapp_usuario', JSON.stringify(resposta.usuario));
  }

  usuarioAtual(): LoginResponse['usuario'] | null {
    const usuario = localStorage.getItem('quadraapp_usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  logout(): void {
    localStorage.removeItem('quadraapp_usuario');
  }
}
