import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Estudios } from "./interfaces/estudios.interface"
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';



interface Institucion{
  value: number;
  viewValue: string;
}
interface TipoEstudio{
  value: number;
  viewValue: string;
}
interface NivelEstudio{
  value: number;
  viewValue: string;
}
interface Titulo{
  value: number;
  viewValue: string;
}
interface EstadoEstudio{
  value: number;
  viewValue: string;
}
interface TipoCurso{
  value: number;
  viewValue: string;
}

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
interface Item{
  name: string;
  content: string;
  value: number;
}
interface EstudiosList {
  institucion: number;
  titulo: number;
  estado: number;
  tipo_estudio: number;
  tipo_curso: number;
  nivel: number;

  // institucion: {
  //   value: number;
  //   description: string;
  // };
  // titulo: {
  //   value: number;
  //   description: string;
  // };
  // estado: {
  //   value: number;
  //   description: string;
  // };
  // tipo: {
  //   value: number;
  //   description: string;
  // };
  // nivel: {
  //   value: number;
  //   description: string;
  // };
}

@Component({
  selector: 'app-estudios-form',
  templateUrl: './estudios-form.component.html',
  styleUrls: ['./estudios-form.component.scss']
})
export class EstudiosFormComponent implements OnInit {

  public disabledButtonNext: boolean = true;


  public datosEstudios: Estudios ={
    idEstudio: 0,
    idCandidato: 0,
    idUsuario: 0,
    idInstitucion: 0,
    fecha_Desde: new Date,
    fecha_Hasta: new Date,
    id_estado_estudio: 0,
    id_tipo_estudio: 0,
    id_nivel_estudio: 0,
    id_tipo_curso: 0,
    id: 0,
    accion: 0,
    titulo: 0 // subitem?
  }

  public columnsReference: any[] = ["institucion", "titulo", "estado", "tipo_estudio", "tipo_curso", "nivel", 'borrar' ];
  public STUDIES_DATA: EstudiosList[] = [];
  public setStudies = {institucion: 0, titulo: 0, estado: 0, tipo_estudio: 0, tipo_curso: 0, nivel: 0, borrar: 0};
  public myReferenceArray: any[] = [];

  // public selectedInstitucion ="";
  public instituciones: Institucion[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'SENA'},
    {value: 2, viewValue: 'Universidad del Valle'},
    {value: 3, viewValue: 'Universidad Nacional'},
    {value: 4, viewValue: 'Universidad Haveriana'},
  ];

  public titulos: Titulo[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'Abogado'},
    {value: 2, viewValue: 'Ingeniero Civil'},
    {value: 3, viewValue: 'Ingeniero de Sistemas'},
    {value: 4, viewValue: 'Analista'},
    {value: 5, viewValue: 'Economista'},
  ];
  public estadosEstudio: EstadoEstudio[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'Culminado'},
    {value: 2, viewValue: 'En Curso'},
    {value: 3, viewValue: 'Abandonado'},
    {value: 4, viewValue: 'Aplazado'},
    {value: 5, viewValue: 'Economista'},
  ];

  public tiposEstudio: TipoEstudio[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'Pregrado'},
    {value: 2, viewValue: 'Especialización'},
    {value: 3, viewValue: 'Estudio Complementario'},
    {value: 4, viewValue: 'Maestría'},
    {value: 5, viewValue: 'Doctorado'},
  ];
  public nivelesEstudio: NivelEstudio[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'Técnica Laboral'},
    {value: 2, viewValue: 'Formación Técnica Profesional'},
    {value: 3, viewValue: 'Tecnológica'},
    {value: 4, viewValue: 'Universidad'},
  ];
  public tiposCurso: TipoCurso[] = [
    {value: 0, viewValue: 'Seleccionar '},
    {value: 1, viewValue: 'Curso'},
    {value: 2, viewValue: 'Taller'},
    {value: 3, viewValue: 'Seminario'},
    {value: 4, viewValue: 'Diplomado'},
    {value: 5, viewValue: 'Otros'},
  ];
  public stepperOrientation: Observable<StepperOrientation>;
  public cols : number | undefined;
  public gridByBreakpoint = {
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

    // this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
    // this.myReferenceArray = new MatTableDataSource<EstudiosList>([...this.STUDIES_DATA]);

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
    this.getLocalStorage();
  }






  addReference() {
    this.STUDIES_DATA.push(this.setStudies);
    console.log('Data reference',this.STUDIES_DATA);
    this.myReferenceArray.push(this.setStudies);
    this.setStudies = {institucion: 0, titulo: 0, estado: 0, tipo_estudio: 0, tipo_curso: 0, nivel: 0, borrar: 0};
    this.myReferenceArray = [...this.myReferenceArray];


    console.warn(this.myReferenceArray);
  }

  onSelectionInstitucion(){
    console.log('Hola');
  }


  public guardarProgreso(){
    console.log('Datos Estudios Guardados', this.myReferenceArray);
    this._storaged.set('datosEstudiosStorage', this.myReferenceArray);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    console.log('Cargar Datos Estudios');
    this.myReferenceArray = this._storaged.get('datosEstudiosStorage');
  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
  }


  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
    // console.log('id', id);
    // if(id > 0){
    //   const objectLabel = list.find((e) => e.value == id);
    //   return objectLabel?.viewValue || '';
    // }else{
    //   return '--o--'
    // }
  }
}
