import { AccueilComponent } from './components/accueil/accueil.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmcontratComponent } from './modales/confirmcontrat/confirmcontrat.component';
import { ContratComponent } from './components/salarie/contrat/contrat.component';
import { ContratentrepriseComponent } from './components/entreprise/contratentreprise/contratentreprise.component';
import { CreatecontratComponent } from './components/entreprise/createcontrat/createcontrat.component';
import { DatePipe } from '@angular/common';
import { DetailcontratComponent } from './modales/detailcontrat/detailcontrat.component';
import { EditprofilentrepriseComponent } from './modales/editprofilentreprise/editprofilentreprise.component';
import { EditprofilsalarieComponent } from './modales/editprofilsalarie/editprofilsalarie.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginentrepriseComponent } from './components/entreprise/loginentreprise/loginentreprise.component';
import { LoginsalarieComponent } from './components/salarie/loginsalarie/loginsalarie.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewentrepriseComponent } from './components/entreprise/overviewentreprise/overviewentreprise.component';
import { OverviewsalarieComponent } from './components/salarie/overviewsalarie/overviewsalarie.component';
import { ProfilentrepriseComponent } from './components/entreprise/profilentreprise/profilentreprise.component';
import { ProfilsalarieComponent } from './components/salarie/profilsalarie/profilsalarie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterentrepriseComponent } from './components/entreprise/registerentreprise/registerentreprise.component';
import { RegistersalarieComponent } from './components/salarie/registersalarie/registersalarie.component';
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
    DetailcontratComponent,
    RegistersalarieComponent,
    RegisterentrepriseComponent,
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
    MatCardModule,
    NgbModule,
    MatStepperModule,
    DatePipe,
    MatProgressSpinnerModule
  ],
  providers: [TokenInterceptorProvider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
