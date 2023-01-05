import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { DetailcontratComponent } from 'src/app/modales/detailcontrat/detailcontrat.component';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalarieModel } from 'src/app/models/salarie-model';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  contrat!: any[];
  contratTab!: any[];
  infoSalarie = new SalarieModel;
  profilEntreprise!: any;
  searchBar = new FormControl ()

  constructor(private _globalService: GlobalService, private _snackBar: MatSnackBar, private matdialog: MatDialog, private _fb: FormBuilder) { }

  ngOnInit(): void {

    //récupérer le profil du salarie
    this._globalService.getProfilSalarie().subscribe((response: any) => {
      this.infoSalarie = response
    })

    //récupérer la liste des entreprises
    this._globalService.getListEntreprise().subscribe((response: any) => {
      this.profilEntreprise = response
    })

    //récupérer les contrats de l'entreprise concernée
    this._globalService.getoneContrat().subscribe((response: any) => {
      this.contrat = response
      this.contratTab = [...this.contrat]
    })

    // pour filtrer la liste des utilisateurs dans la searchBar
    //@ts-ignore
    this.searchBar.valueChanges.subscribe((resultSearch: any) => {
        this.contratTab = this.contrat.filter((profilSalarie: any) => {
          return profilSalarie.fonction.toLowerCase().includes(resultSearch.toLowerCase()) ||
          profilSalarie.statut.toLowerCase().includes(resultSearch.toLowerCase())
        })
    })
  }


   //supprimer un contrat
   deleteContrat(id: any) {
    this._globalService.deleteContrat(id).subscribe((response: any) => {
      //snackBar
      this._snackBar.open('Vous avez bien supprimer le contrat', 'ok')
      //3secondes avant le refresh
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    })
  }

  //Modale Details Contrat
  detailsContrat(item: any) {
    //Ouvrir une modal
    this.matdialog.open(DetailcontratComponent, {
      width: '500px',
      height: '60vh',
      data: item
    })
  }

}
