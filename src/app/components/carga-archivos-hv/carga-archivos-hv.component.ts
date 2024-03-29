import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-carga-archivos-hv',
  templateUrl: './carga-archivos-hv.component.html',
  styleUrls: ['./carga-archivos-hv.component.scss']
})
export class CargaArchivosHvComponent implements OnInit {
  public disabledButtonNext: boolean = true;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Seleccionar archivo';
  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  public selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Seleccione un archivo';
    }
  }

  public upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'No se puede cargar el archivo!';
          }

          this.currentFile = undefined;
        });
    }

  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  public guardarProgreso(){
    // this._storaged.set('archivosStorage', this.archivos);
    this.disabledButtonNext = false;

  }
}
