import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn() && (this._auth.getUser() == 'admin' || this._auth.getUser()== 'employee')) {
      console.log('true');
      // Swal.fire('Are You Sure').then(() => {});
      return true;
    } else {
      localStorage.removeItem('token');
      Swal.fire({icon:'info',text:'you are not allowed to do that',timer:1500,}).then(() => {
        this._router.navigate(['/']);
      });
      return false;
    }
  }
}
