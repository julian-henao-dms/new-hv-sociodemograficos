import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

interface TipoCandidato{
  value: string;
  viewValue: string;
}
interface Doc{
  value: string;
  viewValue: string;
}
interface Pais{
  value: string;
  viewValue: string;
}
interface Depto{
  value: string;
  viewValue: string;
}
interface Ciudad{
  value: string;
  viewValue: string;
}
interface Barrio{
  value: string;
  viewValue: string;
}
interface NivelAcademico{
  value: string;
  viewValue: string;
}
interface LenguajeExtranjera{
  value: string;
  viewValue: string;
}
interface EstadoCivil{
  value: string;
  viewValue: string;
}
interface Cargo{
  value: string;
  viewValue: string;
}
interface AniosExperiencia{
  value: string;
  viewValue: string;
}
interface CategoriaLicencia{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-hv-formulario',
  templateUrl: './hv-formulario.component.html',
  styleUrls: ['./hv-formulario.component.scss']
})
export class HvFormularioComponent implements OnInit {
  public isLinear = false;
  public isActive = true;
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  seventhFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  tiposCandidato: TipoCandidato[] = [
    {value: '0', viewValue: 'Personal Táctico y Soporte'},
    {value: '1', viewValue: 'Personal Operativo'},
   
  ];
  tiposDoc: Doc[] = [
    {value: '0', viewValue: 'Cédula  (CC)'},
    {value: '1', viewValue: 'Tarjeta de Identidad (TI)'},
    {value: '2', viewValue: 'Cédula Extranjería (CE)'},
    {value: '3', viewValue: 'Permisos Especiales de Permanencia'},
    {value: '4', viewValue: 'Otros'}
  ];
  paises: Pais[] = [
    {value: '0', viewValue: 'Argentina'},
    {value: '1', viewValue: 'Bolivia'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Colombia'},
    {value: '4', viewValue: 'Ecuador'},
    {value: '5', viewValue: 'Perú'}
  ];
  deptos: Depto[] = [
    {value: '0', viewValue: 'Antioquia'},
    {value: '1', viewValue: 'Cundinamarca'},
    {value: '2', viewValue: 'Nariño'},
    {value: '3', viewValue: 'Valle del Cauca'},
    {value: '4', viewValue: 'Quindío'},
    {value: '5', viewValue: 'Risaralda'}
  ];
  ciudades: Ciudad[] = [
    {value: '0', viewValue: 'Buenos Aires'},
    {value: '1', viewValue: 'La Paz'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Bogotá'},
    {value: '4', viewValue: 'Medellín'},
    {value: '5', viewValue: 'Quito'}
  ];
  barrios: Barrio[] = [
    {value: '0', viewValue: 'Buenos Aires'},
    {value: '1', viewValue: 'La Paz'},

  ];
  nivelesAcademia: NivelAcademico[] = [
    {value: '0', viewValue: 'Primaria'},
    {value: '1', viewValue: 'Bachiller'}

  ];
  lenguas: LenguajeExtranjera[] = [
    {value: '0', viewValue: 'Inglés'},
    {value: '1', viewValue: 'Frances'}
  ];
  estados: EstadoCivil[] = [
    {value: '0', viewValue: 'Soltero'},
    {value: '1', viewValue: 'Unión Libre'}
  ];
  cargos: Cargo[] = [
    {value: '0', viewValue: 'Soltero'},
    {value: '1', viewValue: 'Unión Libre'}
  ];
  aniosExp: AniosExperiencia[] = [
    {value: '0', viewValue: 'Inglés'},
    {value: '1', viewValue: 'Frances'}
  ];
  categorias: CategoriaLicencia[] = [
    {value: '0', viewValue: 'A1'},
    {value: '1', viewValue: 'B1'}
  ];






  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}
