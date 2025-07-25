import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { Lembrete } from '../models/lembrete';
import { Pagamento } from '../models/pagamento';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://costureiraplus.onrender.com/pedidos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  salvar(pedido: Pedido): Observable<Pedido> {
    if (pedido.id) {
      return this.http.put<Pedido>(`${this.apiUrl}/${pedido.id}`, pedido);
    } else {
      // id 1 = usuário 'costureira'.
      pedido.idUsuarioCostureira = 1;
      return this.http.post<Pedido>(this.apiUrl, pedido);
    }
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLembretesPorPedido(idPedido: number): Observable<Lembrete[]> {
    return this.http.get<Lembrete[]>(`${this.apiUrl}/${idPedido}/lembretes`);
  }

  getPagamentosPorPedido(idPedido: number): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/${idPedido}/pagamentos`);
  }
}
