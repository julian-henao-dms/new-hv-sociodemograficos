import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Referencias } from './interfaces/referencias.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';

export interface user {
  userName: string;
  age: number;
}
export interface Referencia {
  institucion: string;
  titulo: string;
  estado: string;
  tipo: string;
  nivel: string;
}

interface ReferenceList {
  tipo_referencia: number;
  nombre: string;
  celular: string;
  telefono: string;
  correo: string;
  empresa: string;
  cargo: string;
  tiempo_laborado: string;
  motivo_retiro: string;
  notas: string;

}

@Component({
  selector: 'app-referencias-form',
  templateUrl: './referencias-form.component.html',
  styleUrls: ['./referencias-form.component.scss']
})
export class ReferenciasFormComponent implements OnInit {

  public disabledButtonNext: boolean = true;
  public datosReferencias: Referencias = {
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 0,
    idUsuario: 0,
    empresa: '',
    cargo: '',
    observaciones: '',
    id: 0,
    accion: 0,
    tiempoLaborado: '',
    motivoRetiro: '',
  }

  public columnsReference: any[] = ["nombre", "celular", "telefono", "mail", "observaciones", "tipo", 'borrar' ];
  public REFERENCE_DATA: Referencias[] = [];

  public myReferenceArray: any[] = [];
  public setReferences = {
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 0,
    idUsuario: 0,
    empresa: '',
    cargo: '',
    observaciones: '',
    id: 0,
    accion: 0,
    tiempoLaborado: '',
    motivoRetiro: '',
    borrar: 0
  };

   public tiposReferencia = [
      { value: 1, viewValue: "Personal" },
      { value: 2, viewValue: "Laboral" }
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
    private _storaged: SessionStorageService,
    private _addItemTable: AddLabelToTableService
    ){
    // this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
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
    this.REFERENCE_DATA.push(this.setReferences);
    console.log('Data reference',this.REFERENCE_DATA);
    this.myReferenceArray.push(this.setReferences);
    this.setReferences = {idCandidato: 0,
      nombre: '',
      celular: '',
      telefono: '',
      mail: '',
      tipo: 0,
      idUsuario: 0,
      empresa: '',
      cargo: '',
      observaciones: '',
      id: 0,
      accion: 0,
      tiempoLaborado: '',
      motivoRetiro: '',
      borrar: 0};
    this.myReferenceArray = [...this.myReferenceArray];


    console.warn(this.myReferenceArray);
  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
  }

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

  public guardarProgreso(){
    // console.log('Referencias', this.datosReferencias);
    this._storaged.set('datosReferenciasStorage', this.myReferenceArray);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Datos Adicionales', this.datosReferencias);
    // this._storaged.get('datosReferenciasStorage');
  }


}
