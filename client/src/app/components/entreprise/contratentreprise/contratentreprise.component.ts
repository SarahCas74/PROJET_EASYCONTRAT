import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-contratentreprise',
  templateUrl: './contratentreprise.component.html',
  styleUrls: ['./contratentreprise.component.scss']
})
export class ContratentrepriseComponent implements OnInit {
   urlApi: string = 'http://127.0.0.1:5000/upload'
  uploader: FileUploader = new FileUploader({
    url: this.urlApi,
    itemAlias: 'document'
  });

  constructor() { }

  ngOnInit(): void {
    console.log(this.uploader);

    this.uploader.onAfterAddingFile = (fichier: any) => {
    }

    this.uploader.onCompleteItem = (fichier: any) => {
    }
  }

}
