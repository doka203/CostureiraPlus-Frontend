import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { Login } from '../models/login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:8080/auth/login';
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  autenticar(login: Login): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, login).pipe(
      tap(response => this.salvarToken(response.accessToken))
    );
  }

  salvarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  limparToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  logout(): void {
    this.limparToken();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.obterToken();
  }

  extrairDadosToken(): any | null {
    const token = this.obterToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Token inválido:", error);
      return null;
    }
  }
}
