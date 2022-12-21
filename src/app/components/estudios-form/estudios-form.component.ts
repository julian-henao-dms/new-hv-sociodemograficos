import { Component, OnInit, ViewChild  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Estudios } from "./interfaces/estudios.interface"
import { MatTableDataSource } from '@angular/material/table';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';


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
  @ViewChild('addEstudiosData', { static: true })
  fieldDatosEstudios!: NgForm;
  public idEmp: number = 3;
  public numRegla: number = 159;
  public disabledButtonNext: boolean = true;
  public candidatoId = 0;

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
    id: 0,
    idEstudio: null,
    idCandidato: 0,
    idUsuario: 0,
    idInstitucion: null,
    fecha_Desde: new Date,
    fecha_Hasta: new Date,
    id_estado_estudio: null,
    id_tipo_estudio: null,
    id_nivel_estudio: null,
    id_tipo_curso: null,
    accion: 0,
    //titulo: 0 // subitem? no esta en el sp
  }

  public columnsReference: any[] = ["idInstitucion", "idEstudio", "id_estado_estudio", "id_tipo_estudio", "id_tipo_curso", "id_nivel_estudio", 'borrar' ];
  public STUDIES_DATA: Estudios[] = [];
  public setStudies = {
    id: 0,
    idEstudio: null,
    idCandidato: 0,
    idUsuario: 0,
    idInstitucion: null,
    fecha_Desde: new Date,
    fecha_Hasta: new Date,
    id_estado_estudio: null,
    id_tipo_estudio: null,
    id_nivel_estudio: 0,
    id_tipo_curso: 0,
    accion: 0,
  };
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
    private _storaged: SessionStorageService,
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

    const institucion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'institucion');
    this.instituciones = _.orderBy(institucion, ['id'], ['asc']);

    const titulo = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'titulo');
    this.titulos = _.orderBy(titulo, ['id'], ['asc']);

    const tipoCurso = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'tipo_curso');
    this.tiposCurso = _.orderBy(tipoCurso, ['id'], ['asc']);

    const candidatoExistente = this._storaged.get('candidatoExistente');
    console.log('Datos adicionales desde storage', candidatoExistente);
    if(candidatoExistente  && candidatoExistente.length > 0){
      console.log('Candidato existente', candidatoExistente);
    this.candidatoId = candidatoExistente[0].id_rh_candidato

    const getEstudios = await this.getAnyInformation('/hojadevida/estudios/' + this.candidatoId);
    console.log('Estudios: ', getEstudios);
    const newArr = getEstudios.map((obj: {
      id: number;
      id_rh_candidato: number;
      id_rh_profesion: number | null;
      id_rh_institucion: number | null;
      fecha_desde: Date;
      fecha_hasta: Date;
      id_estado_estudio: number | null;
      id_tipo_estudio: number | null;
      id_nivel_estudio: number | null;
      id_tipo_curso: number | null;

    }) => ({
      id: obj.id,
      idEstudio: obj.id_rh_profesion,
      idCandidato: obj.id_rh_candidato,
      idUsuario: 0,
      idInstitucion: obj.id_rh_institucion,
      fecha_Desde: obj.fecha_desde,
      fecha_Hasta: obj.fecha_hasta,
      id_estado_estudio: obj.id_estado_estudio,
      id_tipo_estudio: obj.id_tipo_estudio,
      id_nivel_estudio: obj.id_nivel_estudio ? obj.id_nivel_estudio: 0,
      id_tipo_curso: obj.id_tipo_curso ? obj.id_tipo_curso : 0,
      accion: 0,
    }));
    console.log('new Array', newArr);
    this.myReferenceArray = [...newArr]
    console.log('Array catg',this.myReferenceArray);

    }
    // else{
    // // setTimeout(
    //   //   () => {
    //   //     this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
    //   //   }, 1000);
    //   //   // this.disabledBtnCrear = false;
    // }
    loading.close();


  }


  private async getAnyInformation(service: string): Promise<any> {
    return new Promise((resolve, reject) => {
       this.apiService.getInformacion(service).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(null);
        }
      });
    });
  }



  addReference() {
if(this.fieldDatosEstudios.valid){
      this.STUDIES_DATA.push(this.setStudies);
    console.log('Data reference',this.STUDIES_DATA);
    this.myReferenceArray.push(this.setStudies);
    this.setStudies = {
      id: 0,
      idEstudio: null,
      idCandidato: 0,
      idUsuario: 0,
      idInstitucion: null,
      fecha_Desde: new Date,
      fecha_Hasta: new Date,
      id_estado_estudio: null,
      id_tipo_estudio: null,
      id_nivel_estudio: 0,
      id_tipo_curso: 0,
      accion: 0,
    };
    this.myReferenceArray = [...this.myReferenceArray];
    // console.warn(this.myReferenceArray);}
  }else{
      this.messageService.info('Atención','Para agregar información sobre sus estudios debe llenar todos los campos ... Por favor verifique que no haya campos vacios o sin seleccionar.');
      this.fieldDatosEstudios.control.markAllAsTouched();
  }
}

  onSelectionInstitucion(){
    console.log('Hola');
  }


  public guardarProgreso(){
    // console.log('Datos Estudios Guardados', this.myReferenceArray);
    this._storaged.set('datosEstudiosStorage', this.myReferenceArray);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Datos Estudios');
    // this.myReferenceArray = this._storaged.get('datosEstudiosStorage');
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
