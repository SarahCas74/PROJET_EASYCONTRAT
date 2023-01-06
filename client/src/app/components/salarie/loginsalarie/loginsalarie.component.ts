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


}
