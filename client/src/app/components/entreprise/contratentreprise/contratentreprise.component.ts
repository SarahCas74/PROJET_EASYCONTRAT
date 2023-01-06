import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { DetailcontratComponent } from './../../../modales/detailcontrat/detailcontrat.component';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalarieModel } from 'src/app/models/salarie-model';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-contratentreprise',
  templateUrl: './contratentreprise.component.html',
  styleUrls: ['./contratentreprise.component.scss']
})
export class ContratentrepriseComponent implements OnInit {
  urlApi: string = 'https://easycontrat-back.onrender.com/upload'
  uploader: FileUploader = new FileUploader({
    url: this.urlApi,
    itemAlias: 'document'
  });
  contrat!: any[];
  contratTab!: any[];
  profilEntreprise = new EntrepriseModel;
  profilSalarie!: any;
  searchBar = new FormControl ()


  constructor(private _globalService: GlobalService, private _snackBar: MatSnackBar, private matdialog: MatDialog, private _fb: FormBuilder) { }

  ngOnInit(): void {

    //Pour upload
    this.uploader.onAfterAddingFile = (fichier: any) => {}
    this.uploader.onCompleteItem = (fichier: any) => {}

    //récupérer le profil de l'entreprise
    this._globalService.getProfilEntreprise().subscribe((response: any) => {
      this.profilEntreprise = response
    })

    //récupérer la liste des salariés
    this._globalService.getListSalarie().subscribe((response: any) => {
      this.profilSalarie = response
    })

    //récupérer les contrats de l'entreprise concernée
    this._globalService.getoneContrat().subscribe((response: any) => {
      this.contrat = response
      this.contratTab = [...this.contrat]
    })

    // pour filtrer la liste des utilisateurs dans la searchBar
    //@ts-ignore
    this.searchBar.valueChanges.subscribe((resultSearch: any) => {
        this.contratTab = this.contrat.filter((infoContrat: any) => {
          return infoContrat.nom_salarie.toLowerCase().includes(resultSearch.toLowerCase()) ||
          infoContrat.prenom_salarie.toLowerCase().includes(resultSearch.toLowerCase())
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
