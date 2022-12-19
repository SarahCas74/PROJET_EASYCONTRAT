import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { GlobalService } from '../services/global.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  route: any;

  constructor(private _globalService: GlobalService, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this._globalService.getToken()
    if (token) { return true }
    else {
      this.snackBar.open('Merci de vous identifier ou vous inscrire pour accéder à cette page', 'ok')
      return this.route.navigate(['/'])
    }
  }

}
