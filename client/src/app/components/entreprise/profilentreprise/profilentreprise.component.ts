import { Component, OnInit } from '@angular/core';

import { EditprofilentrepriseComponent } from 'src/app/modales/editprofilentreprise/editprofilentreprise.component';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
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

  constructor(private _globalService: GlobalService, private matdialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this._globalService.getProfilEntreprise().subscribe((response: any) => {

      this.profilEntreprise = response
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
