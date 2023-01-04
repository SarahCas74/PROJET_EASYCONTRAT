import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntrepriseModel } from 'src/app/models/entreprise-model';
import { GlobalService } from 'src/app/services/global.service';
import { FileUploader } from 'ng2-file-upload';
import * as html2pdf from "html2pdf.js"
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { SalarieModel } from 'src/app/models/salarie-model';

@Component({
  selector: 'app-detailcontrat',
  templateUrl: './detailcontrat.component.html',
  styleUrls: ['./detailcontrat.component.scss']
})
export class DetailcontratComponent implements OnInit {
  profilEntreprise = new EntrepriseModel;
  profilSalarie = new SalarieModel;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _globalService: GlobalService) { }
  urlApi: string = 'http://127.0.0.1:5000/upload'
  uploader: FileUploader = new FileUploader({
    url: this.urlApi,
    itemAlias: 'document'
  });
  ngOnInit(): void {

    this.uploader.onAfterAddingFile = (fichier: any) => {
    }

    this.uploader.onCompleteItem = (fichier: any) => {
    }


    //récupérer le profil de l'entreprise
    this._globalService.getProfilEntreprise().subscribe((response: any) => {
      this.profilEntreprise = response
    })

    //récupérer le profil du salarié concerné
    this._globalService.getProfilOneSalarie(this.data.fk_salarie).subscribe((response: any) => {

      this.profilSalarie = response
    })
   
  }

  downloadDOCX() {

    // on créer le header de notre futur document
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    // on créer le footer de notre futur document
    var footer = "</body></html>";

    let content = document.getElementById('text') as HTMLElement | null;

    let sourceHtml = header;
    if (content != null) {
      sourceHtml += content.innerHTML;
    }
    sourceHtml += footer;

    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHtml);

    let fileDownload = document.createElement('a');
    fileDownload.href = source
    fileDownload.setAttribute('download', 'document');
    fileDownload.setAttribute('target', '__blank');

    document.body.appendChild(fileDownload);
    fileDownload.click();
    fileDownload.remove();
  };



  downloadPDF() {
    var element = document.getElementById('text');
    var opt = {
      margin: 1,
      filename: 'Contrat de travail.pdf',
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS:true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }

}
