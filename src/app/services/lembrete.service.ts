import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lembrete } from '../models/lembrete';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  private apiUrl = 'https://costureiraplus.onrender.com/lembretes';

  constructor(private http: HttpClient) { }

  salvar(lembrete: Lembrete): Observable<Lembrete> {
    if (lembrete.id) {
      return this.http.put<Lembrete>(`${this.apiUrl}/${lembrete.id}`, lembrete);
    } else {
      return this.http.post<Lembrete>(this.apiUrl, lembrete);
    }
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
