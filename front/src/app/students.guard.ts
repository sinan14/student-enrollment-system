import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class StudentsGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }


export class StudentsGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn() &&( this._auth.getUser() == 'admin' || this._auth.getUser() == 'user' || this._auth.getUser() == 'employee' )) {
      // console.log('true');
      // Swal.fire('Are You Sure').then(() => {});
      return true;
    } else {
      
      Swal.fire({icon:'warning',text:'you are not allowed to visit that page',timer:2000,showConfirmButton:true}).then(() => {
        this._router.navigate(['/']);
      });
      return false;
    }
  }
}

