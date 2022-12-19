import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { GlobalService } from 'src/app/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginentreprise',
  templateUrl: './loginentreprise.component.html',
  styleUrls: ['./loginentreprise.component.scss']
})
export class LoginentrepriseComponent implements OnInit {
entrepriseLoginForm!: FormGroup;
entrepriseRegisterForm!: FormGroup;
entreprise = new EntrepriseModel();
errorPass = true

  constructor(private _fb: FormBuilder,
    private _route: Router,
    private _globalService: GlobalService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.entrepriseLoginForm = this._fb.group({
      email_entreprise: [this.entreprise.email_entreprise, Validators.required],
      mdp_entreprise: [this.entreprise.mdp_entreprise, Validators.required],
    })

    this.entrepriseRegisterForm = this._fb.group({
      nom_entreprise: [this.entreprise.nom_entreprise, Validators.required],
      prenom_entreprise: [this.entreprise.prenom_entreprise, Validators.required],
      telephone_entreprise: [this.entreprise.telephone_entreprise, Validators.required],
      rue_entreprise: [this.entreprise.rue_entreprise, Validators.required],
      cp_entreprise: [this.entreprise.cp_entreprise, Validators.required],
      ville_entreprise: [this.entreprise.ville_entreprise, Validators.required],
      siret: [this.entreprise.siret, Validators.required],
      raison_sociale: [this.entreprise.raison_sociale, Validators.required],
      code_ape: [this.entreprise.code_ape, Validators.required],
      email_entreprise: [this.entreprise.email_entreprise, Validators.required],
      mdp_entreprise: [this.entreprise.mdp_entreprise, Validators.required],
      confirmPassword: [this.entreprise.confirmPassword, Validators.required],
    })

  }

  onSubmitLogin(): void {

    //requête login du service
    Object.assign(this.entreprise, this.entrepriseLoginForm.value)
    const email_entreprise = { email: this.entreprise.email_entreprise }
    this._globalService.loginEntreprise(this.entreprise).subscribe((response:  EntrepriseModel) => {
      console.log(response);
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(email_entreprise))
      this._route.navigate(['/entreprise/profil'])

    },
      (error) => {                              //Error callback
        this._snackBar.open(error.error, 'ok', { verticalPosition: 'top' })

      }
    )

  }

  onSubmitRegister(): void {
    //CONFIRM PASSWORD
    const password = this.entrepriseRegisterForm.value.mdp_entreprise
    const confirmPassword = this.entrepriseRegisterForm.value.confirmPassword

    if (password !== confirmPassword) {
      this._snackBar.open('Vos mots de passes ne correspondent pas', 'ok', { verticalPosition: 'top' })
      return;
    }

    //requête register du service

    Object.assign(this.entreprise, this.entrepriseRegisterForm.value)
    this._globalService.registerEntreprise(this.entreprise).subscribe((response: any) => {

      localStorage.setItem('token', response.token)
    },
      (error) => {                              //Error callback
        this._snackBar.open(error.error, 'ok', { verticalPosition: 'top' })

      }
    )

    const email_entreprise = { email: this.entreprise.email_entreprise }

    this._globalService.registerEntreprise(this.entreprise).subscribe((result: EntrepriseModel) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(email_entreprise))
        this._route.navigate(['/entreprise/profil'])
      }
    })
  }

  }


