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
import { ProfilentrepriseResolver } from './utils/profilentreprise.resolver';
import { ProfilsalarieComponent } from './components/salarie/profilsalarie/profilsalarie.component';
import { ProfilsalarieResolver } from './utils/profilsalarie.resolver';
import { RegisterentrepriseComponent } from './components/entreprise/registerentreprise/registerentreprise.component';
import { RegistersalarieComponent } from './components/salarie/registersalarie/registersalarie.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'salarie/register', component: RegistersalarieComponent },
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
  { path: 'entreprise/register', component: RegisterentrepriseComponent },
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
        path: 'createcontrat', component: CreatecontratComponent, resolve:{data : ProfilentrepriseResolver}
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
