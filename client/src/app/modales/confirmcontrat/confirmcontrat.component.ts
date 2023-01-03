import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import * as html2pdf from "html2pdf.js"
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-confirmcontrat',
  templateUrl: './confirmcontrat.component.html',
  styleUrls: ['./confirmcontrat.component.scss']
})
export class ConfirmcontratComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private _ref: MatDialogRef<any>, private _globalService: GlobalService, private _route:Router) { }
  urlApi: string = 'http://127.0.0.1:5000/upload'
  uploader: FileUploader = new FileUploader({
    url: this.urlApi,
    itemAlias: 'document'
  });

  ngOnInit(): void {
    console.log(this.data.value);
    this.uploader.onAfterAddingFile = (fichier: any) => {
    }

    this.uploader.onCompleteItem = (fichier: any) => {
    }
  }

  
  closeModal() {
    this._ref.close();
    // this._route.navigate(['/overview'])
  }

  onConfirm() {
    this._ref.close();

  }
  downloadDOCX(){

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

  

downloadPDF(){
    var element = document.getElementById('text');
var opt = {
  margin:       1,
  filename:     'Contrat de travail.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
 
// New Promise-based usage:
html2pdf().from(element).set(opt).save();
  }
}
