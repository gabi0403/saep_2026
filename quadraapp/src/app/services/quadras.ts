import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quadra {
  id: number;
  nome: string;
  tipo: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuadrasService {

  private apiUrl = 'http://localhost:3000/api/quadras';

  constructor(private http: HttpClient) {}

  listar(): Observable<Quadra[]> {
    return this.http.get<Quadra[]>(this.apiUrl);
  }

}