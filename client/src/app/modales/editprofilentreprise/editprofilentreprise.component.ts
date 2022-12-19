import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editprofilentreprise',
  templateUrl: './editprofilentreprise.component.html',
  styleUrls: ['./editprofilentreprise.component.scss']
})
export class EditprofilentrepriseComponent implements OnInit {
  updatedProfilForm!: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _ref: MatDialogRef<any>, private _globalService: GlobalService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.updatedProfilForm = this._fb.group({
      nom_entreprise: this.data.nom_entreprise,
      prenom_entreprise: this.data.prenom_entreprise,
      telephone_entreprise: this.data.telephone_entreprise,
      rue_entreprise: this.data.rue_entreprise,
      cp_entreprise: this.data.cp_entreprise,
      ville_entreprise: this.data.ville_entreprise,
      siret: this.data.siret,
      raison_sociale: this.data.raison_sociale,
      code_ape: this.data.code_ape,
      email_entreprise: this.data.email_entreprise,
      mdp_entreprise: this.data.mdp_entreprise,
    })
  }

  closeModal() {
    this._ref.close();
  }

  onEdit(entreprise: any) {
    this._globalService.updateProfilEntreprise(entreprise.id_entreprise, this.updatedProfilForm.value).subscribe((response) => {



      this._ref.close(
        {
          id_entreprise: entreprise.id_entreprise,
          data: this.updatedProfilForm.value
        }
      )

    })


  }

}
