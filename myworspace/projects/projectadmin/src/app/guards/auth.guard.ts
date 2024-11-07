import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

    const auth = inject(AuthentificationService);
    const router = inject(Router);
    if(!auth.getToken()) {
        router.navigateByUrl('/')
        return false
    }
    return true
}
 

