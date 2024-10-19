import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('uid')) {
    return true;
  }

  return router.parseUrl('/login');
};
