import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Verifica se o usuário está logado usando o método do nosso serviço
  if (loginService.isLoggedIn()) {
    return true; // Permite o acesso à rota
  } else {
    // Se não estiver logado, redireciona para a página de login
    router.navigate(['/login']);
    return false; // Bloqueia o acesso à rota atual
  }
};
