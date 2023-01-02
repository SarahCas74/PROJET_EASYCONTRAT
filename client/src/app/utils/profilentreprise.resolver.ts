import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { EntrepriseModel } from './../models/entreprise-model';
import { GlobalService } from './../services/global.service';
import { Injectable } from '@angular/core';
import { SalarieModel } from './../models/salarie-model';

@Injectable({
  providedIn: 'root'
})
export class ProfilentrepriseResolver implements Resolve<EntrepriseModel[]> {
  constructor(private GlobalService:GlobalService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntrepriseModel[]> {
    return this.GlobalService.getProfilEntreprise();
  }

}
