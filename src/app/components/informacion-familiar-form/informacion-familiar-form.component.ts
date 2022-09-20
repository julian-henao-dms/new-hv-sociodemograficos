import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Familiar } from './interfaces/familiar.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
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

  public columnsReference: any[] = ["identificacion", "nombre", "fecha_nace", "parentezco", "telefono", 'borrar' ];
  public FAMILIAR_DATA: Familiar[] = [];

  public myReferenceArray: any[] = [];
  public setRelatives = {
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
  };

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
    {value: 1, viewValue: 'Abuela/Abuelo'},
    {value: 2, viewValue: 'Esposa/Esposo'},
    {value: 3, viewValue: 'Padre/Madre'},
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
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _storaged: LocalStorageService,
    private _addItemTable: AddLabelToTableService
    ) {
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

  addReference() {
    this.FAMILIAR_DATA.push(this.setRelatives);
    console.log('Data reference',this.FAMILIAR_DATA);
    this.myReferenceArray.push(this.setRelatives);
    this.setRelatives = {
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
    };
    this.myReferenceArray = [...this.myReferenceArray];


    console.warn(this.myReferenceArray);
  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
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

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

}
