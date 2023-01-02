import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalService } from './../../../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SalarieModel } from 'src/app/models/salarie-model';

@Component({
  selector: 'app-loginsalarie',
  templateUrl: './loginsalarie.component.html',
  styleUrls: ['./loginsalarie.component.scss']
})
export class LoginsalarieComponent implements OnInit {
  salarieLoginForm!: FormGroup;
  salarieRegisterForm!: FormGroup;
  salarie = new SalarieModel();
  errorPass = true
  hide = true;

  constructor(private _fb: FormBuilder,
    private _route: Router,
    private _globalService: GlobalService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.salarieLoginForm = this._fb.group({
      email_salarie: [this.salarie.email_salarie, Validators.required],
      mdp_salarie: [this.salarie.mdp_salarie, Validators.required],
    })

    this.salarieRegisterForm = this._fb.group({
      nom_salarie: [this.salarie.nom_salarie, Validators.required],
      prenom_salarie: [this.salarie.prenom_salarie, Validators.required],
      telephone_salarie: [this.salarie.telephone_salarie, Validators.required],
      rue_salarie: [this.salarie.rue_salarie, Validators.required],
      cp_salarie: [this.salarie.cp_salarie, Validators.required],
      ville_salarie: [this.salarie.ville_salarie, Validators.required],
      num_ss: [this.salarie.num_ss, Validators.required],
      date_naissance: [this.salarie.date_naissance, Validators.required],
      lieu_naissance: [this.salarie.lieu_naissance, Validators.required],
      nom_jeune_fille: this.salarie.nom_jeune_fille,
      email_salarie: [this.salarie.email_salarie, Validators.required],
      mdp_salarie: [this.salarie.mdp_salarie, Validators.required],
      confirmPassword: [this.salarie.confirmPassword, Validators.required],
    })

  }



  onSubmitLogin(): void {

    //requête login du service
    Object.assign(this.salarie, this.salarieLoginForm.value)
    const email_salarie = { email: this.salarie.email_salarie }
    this._globalService.loginSalarie(this.salarie).subscribe((response:  SalarieModel) => {
      console.log(response);
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(email_salarie))
      this._route.navigate(['/salarie/profil'])

    },
      (error) => {                              //Error callback
        this._snackBar.open(error.error, 'ok', { verticalPosition: 'top' })

      }
    )

  }

  onSubmitRegister(): void {
    //CONFIRM PASSWORD
    const password = this.salarieRegisterForm.value.mdp_salarie
    const confirmPassword = this.salarieRegisterForm.value.confirmPassword

    if (password !== confirmPassword) {
      this._snackBar.open('Vos mots de passes ne correspondent pas', 'ok', { verticalPosition: 'top' })
      return;
    }

    //requête register du service
    Object.assign(this.salarie, this.salarieRegisterForm.value)
    this._globalService.registerSalarie(this.salarie).subscribe((response: any) => {

      localStorage.setItem('token', response.token)
    },
      (error) => {                              //Error callback
        this._snackBar.open(error.error, 'ok', { verticalPosition: 'top' })

      }
    )

    const email_salarie = { email: this.salarie.email_salarie }

    this._globalService.registerSalarie(this.salarie).subscribe((result: SalarieModel) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(email_salarie))
        this._route.navigate(['/salarie/profil'])
      }
    })
  }

}
