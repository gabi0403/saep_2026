import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agendamento {
  id: number;
  cliente_id: number;
  quadra_id: number;
  data: string;
  hora: string;
  cliente_nome?: string;
  quadra_nome?: string;
  quadra_tipo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  private apiUrl = 'http://localhost:3000/api/agendamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  cadastrar(agendamento: {
    cliente_id: number;
    quadra_id: number;
    data: string;
    hora: string;
  }): Observable<any> {

    return this.http.post(this.apiUrl, agendamento);

  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}