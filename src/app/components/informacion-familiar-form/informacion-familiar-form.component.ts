import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Familiar } from './interfaces/familiar.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
interface Parentesco{
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-informacion-familiar-form',
  templateUrl: './informacion-familiar-form.component.html',
  styleUrls: ['./informacion-familiar-form.component.scss']
})
export class InformacionFamiliarFormComponent implements OnInit {

 public datosInfoFamilia: Familiar ={
  id_candidato: 0,
  nombre: '',
  id_Parentesco: 0,
  edad: 0,
  ne: 0,
  ec: 0,
  ocupacion: '',
  empresa: '',
  telResidencia: '',
  otroFamiliar: 0,
  id: 0,
  accion: 0,
  nit: '',
  fechaNace: new Date,
 }


  parentescos: Parentesco[] = [
    {value: 0, viewValue: 'Abuela/Abuelo'},
    {value: 1, viewValue: 'Esposa/Esposo'},
    {value: 2, viewValue: 'Padre/Madre'},
  ];
  stepperOrientation: Observable<StepperOrientation>;
  cols : number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  constructor(private breakpointObserver: BreakpointObserver, private _storaged: LocalStorageService) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

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

    });
  }

  ngOnInit(): void {
  }

  public guardarProgreso(){
    console.log('Info Familiar Guardada', this.datosInfoFamilia);
    this._storaged.set('datosInfoFamilia', this.datosInfoFamilia);
  }

  public getLocalStorage(){
    console.log('Cargar Datos Info Familiar', this.datosInfoFamilia);
    this._storaged.get('datosInfoFamilia');
  }

  public enviarFormulario(){
    console.log('Formulario Guardado');
    this._storaged.clear();
  }

}
