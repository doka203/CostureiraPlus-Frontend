import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(usuarios => usuarios.filter(usuario => usuario.tipo === 'CLIENTE'))
    );
  }
}
