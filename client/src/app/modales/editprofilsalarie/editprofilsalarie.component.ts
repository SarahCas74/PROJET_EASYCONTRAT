import { GlobalService } from 'src/app/services/global.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editprofilsalarie',
  templateUrl: './editprofilsalarie.component.html',
  styleUrls: ['./editprofilsalarie.component.scss']
})
export class EditprofilsalarieComponent implements OnInit {
  updatedProfilForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<any>, private _globalService: GlobalService, private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.updatedProfilForm = this._fb.group({
      nom_salarie: this.data.nom_salarie,
      prenom_salarie: this.data.prenom_salarie,
      telephone_salarie: this.data.telephone_salarie,
      rue_salarie: this.data.rue_salarie,
      cp_salarie: this.data.cp_salarie,
      ville_salarie: this.data.ville_salarie,
      num_ss: this.data.num_ss,
      date_naissance: this.data.date_naissance,
      lieu_naissance: this.data.lieu_naissance,
      nom_jeune_fille: this.data.nom_jeune_fille,
      email_salarie: this.data.email_salarie,
      mdp_salarie: this.data.mdp_salarie,
    })


  }

  closeModal() {
    this._ref.close();
  }

  onEdit(salarie: any) {
    this._globalService.updateProfil(salarie.id_salarie, this.updatedProfilForm.value).subscribe((response) => {
      console.log(response); //salarie was updated!


      this._ref.close(
        {
          id_salarie: salarie.id_salarie,
          data: this.updatedProfilForm.value
        }
      )

    })


  }
}
