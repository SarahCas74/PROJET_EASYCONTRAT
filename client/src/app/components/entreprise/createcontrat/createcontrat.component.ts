import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith, tap } from 'rxjs';

import { ConfirmcontratComponent } from './../../../modales/confirmcontrat/confirmcontrat.component';
import { ContratModel } from 'src/app/models/contrat-model';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { GlobalService } from 'src/app/services/global.service';
import { SalarieModel } from './../../../models/salarie-model';

// Pour le selected et options
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
  // Formulaire
  createContratForm: FormGroup = new FormGroup({});

  //Models
  contrat = new ContratModel();
  profilEntreprise = new EntrepriseModel();
  salarie = new SalarieModel();

  //récupérer la liste des salariés
  listeSalarie!: any

  //récupérer lr profil d'un salarié
  infoSalarie!: any

  // Pour le selected et options
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
    private _globalService: GlobalService,
    private matdialog: MatDialog,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    //Resolver
    // récupérer le profil entreprise
    this._activatedRoute.data.subscribe(({ data }) => {
      this.profilEntreprise = data

      //récupérer la liste des salariés
      this._globalService.getListSalarie().subscribe((response: any) => {
        this.listeSalarie = response
      })



      //formulaire du contrat
      this.createContratForm = this._fb.group({

        //partie contrat
        fk_salarie: [(''), Validators.required],
        type_: [(''), Validators.required],
        date_debut: [(''), Validators.required],
        date_fin: (''),
        periode_fin_essai: [(''), Validators.required],
        remuneration: [(''), Validators.required],
        motif: (''),
        fonction: [(''), Validators.required],
        statut: [(''), Validators.required],
        is_fullTime: false,
        fk_entreprise: [this.profilEntreprise.id_entreprise, Validators.required],
        //partie entreprise
        nom_entreprise: this.profilEntreprise.nom_entreprise,
        prenom_entreprise: this.profilEntreprise.prenom_entreprise,
        rue_entreprise: this.profilEntreprise.rue_entreprise,
        cp_entreprise: this.profilEntreprise.cp_entreprise,
        ville_entreprise: this.profilEntreprise.ville_entreprise,
        siret: this.profilEntreprise.siret,
        raison_sociale: this.profilEntreprise.raison_sociale,
        code_ape: this.profilEntreprise.code_ape,

        //partie salarie
        nom_salarie: (''),
        prenom_salarie: (''),
        rue_salarie: (''),
        cp_salarie: (''),
        ville_salarie: (''),
        num_ss: (''),
        date_naissance: (''),
        lieu_naissance: (''),
      })

    })

    this.createContratForm.valueChanges.subscribe((value: any) => {
      this._globalService.getProfilOneSalarie(value.fk_salarie).subscribe((profilSalarie: any) => {
        this.infoSalarie = profilSalarie[0]
        value.nom_salarie = this.infoSalarie.nom_salarie
        value.prenom_salarie = this.infoSalarie.prenom_salarie
        value.rue_salarie = this.infoSalarie.rue_salarie
        value.cp_salarie = this.infoSalarie.cp_salarie
        value.ville_salarie = this.infoSalarie.ville_salarie
        value.num_ss = this.infoSalarie.num_ss
        value.date_naissance = this.infoSalarie.date_naissance
        value.lieu_naissance = this.infoSalarie.lieu_naissance
      })
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
