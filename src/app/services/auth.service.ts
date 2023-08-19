import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvService } from './env.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenUrl: string = "";

  constructor(
    private http: HttpClient,
    private readonly envService: EnvService
    ) {
      this.tokenUrl = this.envService.apiUrl + '/Token'
     }

  login(username: string, password: string): Observable<any> {
    console.log("Api Token?",this.tokenUrl);
    return this.http.post<any>(this.tokenUrl, { usuario: username, password: password });
  }
}
