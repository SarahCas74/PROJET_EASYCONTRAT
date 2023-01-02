import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { GlobalService } from './../services/global.service';
import { Injectable } from '@angular/core';
import { SalarieModel } from './../models/salarie-model';

@Injectable({
  providedIn: 'root'
})
export class ProfilsalarieResolver implements Resolve<SalarieModel> {
  id!:number
  constructor(private GlobalService:GlobalService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SalarieModel> {
    return this.GlobalService.getProfilOneSalarie(this.id);
  }
}
