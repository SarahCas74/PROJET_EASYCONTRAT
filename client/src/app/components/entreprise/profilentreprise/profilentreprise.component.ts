import { Component, OnInit } from '@angular/core';

import { EditprofilentrepriseComponent } from 'src/app/modales/editprofilentreprise/editprofilentreprise.component';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private _globalService: GlobalService, private matdialog: MatDialog, private router: Router) { }

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

      //fichier uploadé
      this.uploader.onAfterAddingFile = (fichier: any) => {
      }
      this.uploader.onCompleteItem = (fichier: any) => {
      }
    })
  }

  //Editer le profil
  editModal(item: any) {
    //Ouvrir une modal
    let dialogRef = this.matdialog.open(EditprofilentrepriseComponent, {
      width: '500px',
      data: item
    })
    //Fermer une modal
    dialogRef.afterClosed().subscribe((updatedProfil: any) => {

      this.profilEntreprise = updatedProfil.data
    })
  }


}
