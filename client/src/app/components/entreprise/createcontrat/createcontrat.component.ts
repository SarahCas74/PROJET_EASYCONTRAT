import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';

import { ConfirmcontratComponent } from './../../../modales/confirmcontrat/confirmcontrat.component';
import { ContratModel } from 'src/app/models/contrat-model';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { SalarieModel } from './../../../models/salarie-model';

interface Motif {
  value: string;
  motif: string;
}

interface Statut {
  value: string;
  statut: string;
}

interface Type {
  value: string;
  type: string;
}


@Component({
  selector: 'app-createcontrat',
  templateUrl: './createcontrat.component.html',
  styleUrls: ['./createcontrat.component.scss']
})
export class CreatecontratComponent implements OnInit {

  createContratForm!: FormGroup;
  contrat = new ContratModel();
  listeSalarie!: any
  profilEntreprise = new EntrepriseModel;


  types: Type[] = [
    { type: 'CDD', value: 'CDD' },
    { type: 'CDI', value: 'CDI' }
  ];
  typeFormControl = new FormControl(this.types[1].value);

  motifs: Motif[] = [
    { motif: 'Surcroît d\'activité', value: 'Surcroît d\'activité' },
    { motif: 'Remplacement', value: 'Remplacement' }
  ];
  motifFormControl = new FormControl(this.motifs[1].value);

  statuts: Statut[] = [
    { statut: 'Agent de maîtrise', value: 'Agent de maîtrise' },
    { statut: 'Cadre', value: 'Cadre' },
    { statut: 'Employé', value: 'Employé' },
    { statut: 'Ouvrier', value: 'Ouvrier' }
  ];
  statutFormControl = new FormControl(this.statuts[3].value);

  constructor(private _fb: FormBuilder,
    private _route: Router,
    private _globalService: GlobalService,
    private matdialog: MatDialog) { }

  ngOnInit(): void {
    //formulaire du contrat
    this.createContratForm = this._fb.group({
      fk_salarie: [this.contrat.fk_salarie, Validators.required],
      type_: [this.contrat.type_, Validators.required],
      date_debut: [this.contrat.date_debut, Validators.required],
      date_fin: this.contrat.date_fin,
      periode_fin_essai: [this.contrat.periode_fin_essai, Validators.required],
      remuneration: [this.contrat.remuneration, Validators.required],
      motif: [this.contrat.motif, Validators.required],
      fonction: [this.contrat.fonction, Validators.required],
      statut: [this.contrat.statut, Validators.required],
      is_fullTime: this.contrat.is_fullTime,
      fk_entreprise: [this.contrat.fk_entreprise, Validators.required],
      nom_entreprise: this.profilEntreprise.nom_entreprise,
      prenom_entreprise: this.profilEntreprise.prenom_entreprise,
      rue_entreprise: this.profilEntreprise.rue_entreprise,
      cp_entreprise: this.profilEntreprise.cp_entreprise,
      ville_entreprise: this.profilEntreprise.ville_entreprise,
      siret: this.profilEntreprise.siret,
      raison_sociale: this.profilEntreprise.raison_sociale,
      code_ape: this.profilEntreprise.code_ape
    })

    //récupérer la liste des salariés
    this._globalService.getListSalarie().subscribe((response: any) => {
      this.listeSalarie = response

    })

    //profil entreprise
    this._globalService.getProfilEntreprise().subscribe((response: any) => {
      this.profilEntreprise = response
    })

  }





  onSubmitCreate(item: any) {

    Object.assign(this.contrat, this.createContratForm.value)
    this._globalService.createContrat(this.contrat).subscribe((response: ContratModel) => {
      console.log(response);


      //Ouvrir une modal
      this.matdialog.open(ConfirmcontratComponent, {
        width: '500px',
        height: '60vh',
        data: item
      })
      //Fermer une modal




    })











  }




}
