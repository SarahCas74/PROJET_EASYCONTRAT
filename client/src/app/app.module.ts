import { AccueilComponent } from './components/accueil/accueil.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmcontratComponent } from './modales/confirmcontrat/confirmcontrat.component';
import { ContratComponent } from './components/salarie/contrat/contrat.component';
import { ContratentrepriseComponent } from './components/entreprise/contratentreprise/contratentreprise.component';
import { CreatecontratComponent } from './components/entreprise/createcontrat/createcontrat.component';
import { EditprofilentrepriseComponent } from './modales/editprofilentreprise/editprofilentreprise.component';
import { EditprofilsalarieComponent } from './modales/editprofilsalarie/editprofilsalarie.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginentrepriseComponent } from './components/entreprise/loginentreprise/loginentreprise.component';
import { LoginsalarieComponent } from './components/salarie/loginsalarie/loginsalarie.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { OverviewentrepriseComponent } from './components/entreprise/overviewentreprise/overviewentreprise.component';
import { OverviewsalarieComponent } from './components/salarie/overviewsalarie/overviewsalarie.component';
import { ProfilentrepriseComponent } from './components/entreprise/profilentreprise/profilentreprise.component';
import { ProfilsalarieComponent } from './components/salarie/profilsalarie/profilsalarie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorProvider } from './utils/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginsalarieComponent,
    OverviewsalarieComponent,
    EditprofilsalarieComponent,
    ContratComponent,
    ProfilsalarieComponent,
    LoginentrepriseComponent,
    ProfilentrepriseComponent,
    OverviewentrepriseComponent,
    EditprofilentrepriseComponent,
    ContratentrepriseComponent,
    CreatecontratComponent,
    ConfirmcontratComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    FileUploadModule,
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
