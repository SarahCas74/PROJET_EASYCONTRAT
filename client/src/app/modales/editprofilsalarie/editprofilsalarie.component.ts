import { GlobalService } from 'src/app/services/global.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editprofilsalarie',
  templateUrl: './editprofilsalarie.component.html',
  styleUrls: ['./editprofilsalarie.component.scss']
})
export class EditprofilsalarieComponent implements OnInit {
  updatedProfilForm!: FormGroup;
  errorPass = true
  hide = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<any>, private _globalService: GlobalService, private _fb: FormBuilder, private _snackBar: MatSnackBar, public datepipe: DatePipe) { }

  ngOnInit(): void {

let date_naissance = this.datepipe.transform(this.data.date_naissance, 'MM-dd-yyyy')

    this.updatedProfilForm = this._fb.group({
      nom_salarie: this.data.nom_salarie,
      prenom_salarie: this.data.prenom_salarie,
      telephone_salarie: this.data.telephone_salarie,
      rue_salarie: this.data.rue_salarie,
      cp_salarie: this.data.cp_salarie,
      ville_salarie: this.data.ville_salarie,
      num_ss: this.data.num_ss,
      date_naissance: date_naissance,
      lieu_naissance: this.data.lieu_naissance,
      nom_jeune_fille: this.data.nom_jeune_fille,
      email_salarie: this.data.email_salarie,
      mdp_salarie: [(''), Validators.required],
      confirmPassword: [(''), Validators.required]
    })

    
    
  }

  closeModal() {
    this._ref.close();
  }

  onEdit(salarie: any) {
    //CONFIRM PASSWORD
    const password = this.updatedProfilForm.value.mdp_salarie
    const confirmPassword = this.updatedProfilForm.value.confirmPassword

    if (password !== confirmPassword) {
      this._snackBar.open('Vos mots de passes ne correspondent pas', 'ok', { verticalPosition: 'top' })
      return;
    }
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
