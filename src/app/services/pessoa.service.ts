import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarMeusClientes(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/meus-clientes`);
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id) {
      return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`, pessoa);
    } else {
      return this.http.post<Pessoa>(`${this.apiUrl}/meus-clientes`, pessoa);
    }
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
