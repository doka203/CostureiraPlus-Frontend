import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lembrete } from '../models/lembrete';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  private apiUrl = 'http://localhost:8080/lembretes';

  constructor(private http: HttpClient) { }

  salvar(lembrete: Lembrete): Observable<Lembrete> {
    return this.http.post<Lembrete>(this.apiUrl, lembrete);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
