import { Component, OnInit } from '@angular/core';

import { EditprofilsalarieComponent } from 'src/app/modales/editprofilsalarie/editprofilsalarie.component';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalarieModel } from 'src/app/models/salarie-model';

@Component({
  selector: 'app-profilsalarie',
  templateUrl: './profilsalarie.component.html',
  styleUrls: ['./profilsalarie.component.scss']
})
export class ProfilsalarieComponent implements OnInit {
  profilSalarie = new SalarieModel;
  constructor(private _globalService: GlobalService, private matdialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this._globalService.getProfilSalarie().subscribe((response: any) => {

      this.profilSalarie = response
    })
  }

  //Editer le profil
  editModal(item: any) {
    //Ouvrir une modal
    let dialogRef = this.matdialog.open(EditprofilsalarieComponent, {
      width: '500px',
      data: item
    })
    //Fermer une modal
    dialogRef.afterClosed().subscribe((updatedProfil: any) => {

        this.profilSalarie = updatedProfil.data
    })
  }
  
}