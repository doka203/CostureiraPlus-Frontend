import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl = 'https://costureiraplus.onrender.com/pagamentos';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.apiUrl);
  }

  registrarPagamento(id: number, dataPagamento: string): Observable<Pagamento> {
    const body = { dataPagamento: dataPagamento };
    return this.http.put<Pagamento>(`${this.apiUrl}/${id}/registrar-pagamento`, body);
  }
}
