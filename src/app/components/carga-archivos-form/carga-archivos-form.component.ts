import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-carga-archivos-form',
  templateUrl: './carga-archivos-form.component.html',
  styleUrls: ['./carga-archivos-form.component.scss']
})
export class CargaArchivosFormComponent implements OnInit {
  public disabledButtonNext: boolean = true;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr = 'Cargar Archivos';

  constructor(private _guardarProgreso: LocalStorageService) { }

  ngOnInit(): void {
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Cargar Archivos';
    }
  }

  public guardarProgreso(){
    // console.log('Archivos', this.archivos);
    // this._guardarProgreso.set('archivosStorage', this.archivos);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Archivos', this.archivos);
    // this._guardarProgreso.get('archivosStorage');
  }
}
