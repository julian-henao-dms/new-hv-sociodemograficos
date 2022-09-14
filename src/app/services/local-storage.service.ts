import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public set(key: string, data: any){
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error al guardar los datos', e);
    }
  }

  public get(key: string){
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      console.error('Error al cargar los datos', e);
      return null;
    }
  }

  public remove(key: string){
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error al eliminar datos', e);
    }
  }

  public clear(): void{
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error al limpiar el LocalStorage', e);
    }
  }



}
