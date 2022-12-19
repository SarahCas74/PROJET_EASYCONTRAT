import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  backend = 'http://127.0.0.1:5000';
  constructor(private _http: HttpClient, private router: Router) { }

  //Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  //Méhode qui supprime le token pour la déconnexion Log out dans l'overview
  clearToken() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

  //login du salarié
  loginSalarie(salarieLoginForm: any): Observable<any> {
    return this._http.post(this.backend + "/salarie/login", salarieLoginForm)
  }

  //login entreprise
  loginEntreprise(entrepriseLoginForm: any): Observable<any> {
    return this._http.post(this.backend + "/entreprise/login", entrepriseLoginForm)
  }

  //register salarié
  registerSalarie(salarieRegisterForm: any): Observable<any> {
    return this._http.post(this.backend + "/salarie", salarieRegisterForm)
  }

  //register entreprise
  registerEntreprise(entrepriseRegisterForm: any): Observable<any> {
    return this._http.post(this.backend + "/entreprise", entrepriseRegisterForm)
  }

  // profil salarie
  getProfilSalarie(): Observable<any> {
    return this._http.get(this.backend + "/salarie/profil")
  }

  // profil entreprise
  getProfilEntreprise(): Observable<any> {
    return this._http.get(this.backend + "/entreprise/profil")
  }

  //modifier le profil salarie
  updateProfil(id: number, salarie: string): Observable<any> {
    return this._http.put(`${this.backend}` + "/salarie/update", salarie)
  }

  //modifier le profil entreprise
  updateProfilEntreprise(id: number, entreprise: string): Observable<any> {
    return this._http.put(`${this.backend}` + "/entreprise/update", entreprise)
  }

  // liste des salariés
  getListSalarie(): Observable<any> {
    return this._http.get(this.backend + "/entreprise/listesalaries")
  }

  // créer un contrat
  createContrat(createContratForm: any): Observable<any> {
    return this._http.post(this.backend + "/contrat", createContratForm)
  }

}