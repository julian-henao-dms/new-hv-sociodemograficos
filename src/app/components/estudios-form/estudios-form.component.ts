import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Estudios } from "./interfaces/estudios.interface"
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';



interface Institucion{
  id: number;
  descripcion: string;
}
interface TipoEstudio{
  id: number;
  descripcion: string;
}
interface NivelEstudio{
   id: number;
  descripcion: string;
}
interface Titulo{
   id: number;
  descripcion: string;
}
interface EstadoEstudio{
   id: number;
  descripcion: string;
}
interface TipoCurso{
   id: number;
  descripcion: string;
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
}

@Component({
  selector: 'app-estudios-form',
  templateUrl: './estudios-form.component.html',
  styleUrls: ['./estudios-form.component.scss']
})
export class EstudiosFormComponent implements OnInit {
  public idEmp: number = 3;
  public numRegla: number = 159;
  public disabledButtonNext: boolean = true;

  public instituciones: Institucion[] = [];
  public titulos: Titulo[] = [];
  public tiposCurso: TipoCurso[] = [];

  public nivelesEstudio: NivelEstudio[] = [
    {id: 0, descripcion: 'Seleccionar '},
    {id: 1, descripcion: 'Técnica Laboral'},
    {id: 2, descripcion: 'Formación Técnica Profesional'},
    {id: 3, descripcion: 'Tecnológica'},
    {id: 4, descripcion: 'Universidad'},
  ];
  public tiposEstudio: TipoEstudio[] = [
    {id: 0, descripcion: 'Seleccionar '},
    {id: 1, descripcion: 'Pregrado'},
    {id: 2, descripcion: 'Especialización'},
    {id: 3, descripcion: 'Estudio Complementario'},
    {id: 4, descripcion: 'Maestría'},
    {id: 5, descripcion: 'Doctorado'},
  ];
  public estadosEstudio: EstadoEstudio[] = [
    {id: 0, descripcion: 'Seleccionar '},
    {id: 1, descripcion: 'Culminado'},
    {id: 2, descripcion: 'En Curso'},
    {id: 3, descripcion: 'Abandonado'},
    {id: 4, descripcion: 'Aplazado'}
  ];


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
    private _addItemTable: AddLabelToTableService,
    private apiService: ApiService,
    private messageService: MessagesService
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

  async ngOnInit(): Promise<void> {
    this.getLocalStorage();
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const institucion = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'institucion' + '/' + 'subcriterio');
    this.instituciones = institucion;

    const titulo = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'titulo' + '/' + 'subcriterio');
    this.titulos = titulo;

    const tipoCurso = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'tipo_curso' + '/' + 'subcriterio');
    this.tiposCurso = tipoCurso;


  }


  private async getAnyInformationAlt(service: string): Promise<any> {
    return new Promise((resolve, reject) => {
       this.apiService.getInformacionMaestros(service).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(null);
        }
      });
    });
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
