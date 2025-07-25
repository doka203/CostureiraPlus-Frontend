import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visita } from '../models/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private apiUrl = 'http://localhost:8080/visitas';

  constructor(private http: HttpClient) { }

  // Busca visitas dentro de um período de datas
  getAgendaPorPeriodo(dataInicio: string, dataFim: string): Observable<Visita[]> {
    const params = new HttpParams()
      .set('inicio', dataInicio)
      .set('fim', dataFim);

    return this.http.get<Visita[]>(`${this.apiUrl}/agenda`, { params });
  }

  // Salva uma nova visita
  salvar(visita: Visita): Observable<Visita> {
    // O id da costureira é fixo por enquanto (usuário 'costureira' com ID 1)
    visita.idUsuarioCostureira = 1;
    return this.http.post<Visita>(this.apiUrl, visita);
  }
}
