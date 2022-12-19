import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-confirmcontrat',
  templateUrl: './confirmcontrat.component.html',
  styleUrls: ['./confirmcontrat.component.scss']
})
export class ConfirmcontratComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private _ref: MatDialogRef<any>, private _globalService: GlobalService, private _route:Router) { }

  ngOnInit(): void {
    console.log(this.data.value);
    
  }

  
  closeModal() {
    this._ref.close();
    // this._route.navigate(['/overview'])
  }

  onConfirm() {
    this._ref.close();

  }

}
