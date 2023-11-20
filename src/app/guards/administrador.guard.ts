import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { InfoToken } from '../interfaces/users';

export const administradorGuard: CanActivateFn = (route, state):boolean => {
  /*const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  authService.decodeToken(token).subscribe(
    response => {
      const info_user = response

      if(info_user.id_rol==1) {
        return true;
      } else {
        router.navigate(['/login'])
        return false;
      }
    }, error => {
      return false;
    }
  )*/

  return true;
};
