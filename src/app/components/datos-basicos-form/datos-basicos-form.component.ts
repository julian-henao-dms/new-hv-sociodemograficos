import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.scss']
})
export class DatosBasicosFormComponent implements OnInit {
  colsAlt : number | undefined;

  gridByBreakpointAlt = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  cols : number | undefined;
 
  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  
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
  public typeCandidato: number = 0;
  public txtnombre:string="";

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.colsAlt = this.gridByBreakpointAlt.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.colsAlt = this.gridByBreakpointAlt.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.colsAlt = this.gridByBreakpointAlt.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.colsAlt = this.gridByBreakpointAlt.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.colsAlt = this.gridByBreakpointAlt.xl;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
