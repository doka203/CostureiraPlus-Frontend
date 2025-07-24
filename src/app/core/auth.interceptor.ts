import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const authToken = loginService.obterToken();

  // Se o token existir, clona a requisição e adiciona o cabeçalho de autorização
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Se não houver token, apenas continua com a requisição original
  return next(req);
};
