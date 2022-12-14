import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddLabelToTableService {



  constructor() { }

  public findLabel(id: number, list: any[]){
    // console.log('id', id);
    if(id > 0){
      const objectLabel = list.find((e) => e.value == id);
      return objectLabel?.viewValue || '';
    }else{
      return '--o--'
    }

  }
}
