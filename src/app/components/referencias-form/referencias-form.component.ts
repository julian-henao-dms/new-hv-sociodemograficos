import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Referencias } from './interfaces/referencias.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import * as _ from 'lodash';
import { MessagesService } from 'src/app/services/messages.service';

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
  public candidatoId = 0;

  public datosReferencias: Referencias = {
    id: 0,
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 0,
    idUsuario: 0,
    empresa: '',
    Cargo: '',
    Observaciones: '',
    TiempoLaborado: '',
    MotivoRetiro: '',
    accion: 0,
  }

  public columnsReference: any[] = ["nombre", "celular", "telefono", "mail", "Observaciones", "tipo", 'borrar' ];
  public REFERENCE_DATA: Referencias[] = [];

  public myReferenceArray: any[] = [];
  public setReferences = {
    id: 0,
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 0,
    idUsuario: 0,
    empresa: '',
    Cargo: '',
    Observaciones: '',
    TiempoLaborado: '',
    MotivoRetiro: '',
    accion: 0,
  };

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    // correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/ // 7 a 14 numeros.
  }

   public tiposReferencia = [
      { id: 1, descripcion: "Personal" },
      { id: 2, descripcion: "Laboral" }
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
    private _addItemTable: AddLabelToTableService,
    private messageService: MessagesService
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
    this.setReferences = {
      id: 0,
      idCandidato: 0,
      nombre: '',
      celular: '',
      telefono: '',
      mail: '',
      tipo: 0,
      idUsuario: 0,
      empresa: '',
      Cargo: '',
      Observaciones: '',
      TiempoLaborado: '',
      MotivoRetiro: '',
      accion: 0,
      };
    this.myReferenceArray = [...this.myReferenceArray];


    // console.warn(this.myReferenceArray);
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
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Datos Adicionales', this.datosReferencias);
    // this._storaged.get('datosReferenciasStorage');
  }


}
