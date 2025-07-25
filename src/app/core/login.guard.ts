import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    // Se o utilizador já está logado, redireciona para a home e bloqueia a rota de login
    router.navigate(['/home']);
    return false;
  } else {
    // Se não está logado, permite o acesso à rota de login
    return true;
  }
};
