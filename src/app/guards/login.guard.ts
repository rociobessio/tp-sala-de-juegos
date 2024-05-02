import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

//-->Importo el servicio de usuario/login/register
import { UserService } from '../services/auth.user.service';

/**
 * Guard observable para corroborar
 * el inicio de sesion  del usuario.
 */
// export const loginGuard: CanActivateFn = (): Observable<boolean> =>{

// };