import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;
  private readonly token = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

   public async getInformacion(servicio: string): Promise<Observable<any>> {
    const url = this.apiUrl + servicio;
    console.log(url)
    return this.http.get(url);
  }


  //  public async getInformacion(servicio: string, param: string): Promise<Observable<any>> {
  //   const url = this.apiUrl + servicio + param;
  //   console.log(url)
  //   const Headers = new HttpHeaders().set('Authorization', this.token);
  //   return this.http.get(url, { headers: Headers });
  // }

  public async saveInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.apiUrl + servicio;
    const params = JSON.stringify(document);
    const Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    return this.http.post(url, params, { headers: Headers });
  }

  public async updateInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.apiUrl + servicio;
    const params = JSON.stringify(document);
    const Headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, params, { headers: Headers });
  }


}
