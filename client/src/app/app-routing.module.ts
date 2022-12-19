import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { ContratComponent } from './components/salarie/contrat/contrat.component';
import { ContratentrepriseComponent } from './components/entreprise/contratentreprise/contratentreprise.component';
import { CreatecontratComponent } from './components/entreprise/createcontrat/createcontrat.component';
import { LoginentrepriseComponent } from './components/entreprise/loginentreprise/loginentreprise.component';
import { LoginsalarieComponent } from './components/salarie/loginsalarie/loginsalarie.component';
import { NgModule } from '@angular/core';
import { OverviewentrepriseComponent } from './components/entreprise/overviewentreprise/overviewentreprise.component';
import { OverviewsalarieComponent } from './components/salarie/overviewsalarie/overviewsalarie.component';
import { ProfilentrepriseComponent } from './components/entreprise/profilentreprise/profilentreprise.component';
import { ProfilsalarieComponent } from './components/salarie/profilsalarie/profilsalarie.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'salarie/login', component: LoginsalarieComponent },
  {
    path: 'salarie', component: OverviewsalarieComponent,
    children: [
      {
        path: 'contrat', component: ContratComponent
      },
      {
        path: 'profil', component: ProfilsalarieComponent
      }]
  },
  { path: 'entreprise/login', component: LoginentrepriseComponent },
  {
    path: 'entreprise', component: OverviewentrepriseComponent,
    children: [
      {
        path: 'contrat', component: ContratentrepriseComponent
      },
      {
        path: 'profil', component: ProfilentrepriseComponent
      },
      {
        path: 'createcontrat', component: CreatecontratComponent
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
