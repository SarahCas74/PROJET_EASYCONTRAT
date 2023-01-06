import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EditprofilentrepriseComponent } from 'src/app/modales/editprofilentreprise/editprofilentreprise.component';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'src/app/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilentreprise',
  templateUrl: './profilentreprise.component.html',
  styleUrls: ['./profilentreprise.component.scss']
})
export class ProfilentrepriseComponent implements OnInit {
  profilEntreprise = new EntrepriseModel;

  urlApi: string = 'https://easycontrat-back.onrender.com/upload'
  uploader: any = new FileUploader({});
  uploaderlogo: any = new FileUploader({});
  constructor(private _globalService: GlobalService, private matdialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {



    //récupérer le profil de l'entreprise
    this._globalService.getProfilEntreprise().subscribe((response: any) => {
      this.profilEntreprise = response
      //ajouter l'extension au fichier uploadé
      this.uploader = new FileUploader({
        url: this.urlApi,
        headers: [{ name: 'nomEntreprise', value: this.profilEntreprise.nom_entreprise }, { name: 'typeimage', value: 'signature' }],
        itemAlias: 'document'
      });

      this.uploaderlogo = new FileUploader({
        url: this.urlApi,
        headers: [{ name: 'nomEntreprise', value: this.profilEntreprise.nom_entreprise }, { name: 'typeimage', value: 'logo' }],
        itemAlias: 'document'
      });

      //fichier uploadé signature
      this.uploader.onAfterAddingFile = (fichier: any) => {
        
      }
      this.uploader.onCompleteItem = (fichier: any) => {
        this._snackBar.open('Votre fichier a bien été importé', 'ok', { verticalPosition: 'top' })
      }

            //fichier uploadé logo
      this.uploaderlogo.onAfterAddingFile = (fichier: any) => {
        
      }
      this.uploaderlogo.onCompleteItem = (fichier: any) => {
        this._snackBar.open('Votre fichier a bien été importé', 'ok', { verticalPosition: 'top' })
      }






    })
  }

  //Editer le profil
  editModal(item: any) {
    const modalOptions: MatDialogConfig = {
      disableClose: true,
    };
    //Ouvrir une modal
    let dialogRef = this.matdialog.open(EditprofilentrepriseComponent,{
      width: '500px',
      height:'80vh',
      data: item,
      ...modalOptions
    })
    //Fermer une modal
    dialogRef.afterClosed().subscribe((updatedProfil: any) => {

      this.profilEntreprise = updatedProfil.data
    })
  }


}
