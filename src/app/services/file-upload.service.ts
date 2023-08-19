import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private readonly baseUrl: string = "";

  constructor(
    private http: HttpClient,
    private readonly envService: EnvService
    ) {
      this.baseUrl = this.envService.apiUrl;
    }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
