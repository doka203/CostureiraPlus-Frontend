import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl = 'http://localhost:8080/pagamentos';

  constructor(private http: HttpClient) { }

  registrarPagamento(id: number, dataPagamento: string): Observable<Pagamento> {
    // O endpoint espera receber a data diretamente no corpo da requisição
    return this.http.put<Pagamento>(`${this.apiUrl}/${id}/registrar-pagamento`, dataPagamento, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
