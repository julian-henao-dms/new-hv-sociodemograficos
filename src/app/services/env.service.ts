import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl: string = '';
  // Company none
  // public node: string = '';
  // Company
  public company: number = 0;
  //Regla de negocio
  public regla: number = 0;

  // Whether or not to enable debug mode
  public enableDebug: boolean = true;

  constructor() { }
}
