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
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';


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
// interface EstudiosList {
//   institucion: number;
//   titulo: number;
//   estado: number;
//   tipo_estudio: number;
//   tipo_curso: number;
//   nivel: number;
// }

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

  public todosDatosCandidato: TodosDatosCandidato = {
    candidato:{
      id:0,
      emp: this.idEmp,
      id_usuario: 0,
      id_tipo_candidato: null,
      id_rh_tipo_documento: null,
      nit: '',
      estado: 1,
      fecExpedicion: new Date,
      lugarExpedicion: '',
      idCotClientePais: null,
      nombre: '',
      apellido: '',
      genero: null,
      fecha_nacimiento: new Date,
      idRhEstadoCivil: null,
      telefono: '',
      mail: '',
      celular: '',
      direccion: '',
      id_cot_cliente_pais: null,
      id_cot_cliente_barrio: null,
      id_rh_experiencia: null,
      id_rh_nivel_academico: null,
      id_rh_perfil: null,
      pais: null,
      paisExp: null,
      depto: null,
      deptoExp: null,
      fuente: '',
      id_rh_experiencia_sector: null,
      id_rh_experiencia_equipo: null,
      id_salario: null,
      salario: null,
      id_rh_fuente_reclutamiento: null,
      tarjeta: '',
      id_Entidad: null,
      id_participacion_anterior: 0,
      id_trajo_hoja_vida: 0,
      id_disponibilidad_viaje: 0,
      runt: 0,
      idRhEps: null,
      idRhFondoPension: null,
      idRhFondoCaja: null,
      idRhFondoCesantias: null,
      licencia: '',
      tipo_licencia: null,
      fecha_vence_licencia: '',
      id_rh_categoria: null,
      id_rh_color_piel: null,
      id_rh_grupo_sanguineo: null,
      rh: null,
      peso: null,
      altura: null,
    },
    referencias_familiares: [
      // ...this.infoFamilia
    ],
    estudios: [
        // ...this.estudios
    ],
    idiomas: [
        // ...this.idiomas
    ],
    referencias: [
      //  ...this.referencias
    ],
    categorias: [
      // ...this.categoriaLicencia
    ],
    cargos: [
      //  ...this.cargos
    ]
  }
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

    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const institucion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'institucion');
    this.instituciones = _.orderBy(institucion, ['id'], ['asc']);

    const titulo = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'titulo');
    this.titulos = _.orderBy(titulo, ['id'], ['asc']);

    const tipoCurso = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'tipo_curso');
    this.tiposCurso = _.orderBy(tipoCurso, ['id'], ['asc']);

    // this.getLocalStorage();
    this.todosDatosCandidato =  this._storaged.get('todosCandidatoStorage');
    const datosEstudios = this.todosDatosCandidato.estudios;
    // const candidatoExistente = this._storaged.get('candidatoExistente');

    if(this.todosDatosCandidato.estudios && this.todosDatosCandidato.estudios.length > 0){
      this.myReferenceArray = [...this.todosDatosCandidato.estudios]
      console.log("Datos Estudios 2", this.myReferenceArray);
    }
    // else if(candidatoExistente  && candidatoExistente.length > 0){

    //     this.candidatoId = candidatoExistente[0].id
    //     console.log(this.candidatoId);
    //     const getEstudios = await this.getAnyInformation('/hojadevida/estudios/' + this.candidatoId);
    //     console.log(getEstudios);
    //     const newArr = getEstudios.map((obj: {
    //       id: number;
    //       id_rh_candidato: number;
    //       id_rh_profesion: number | null;
    //       id_rh_institucion: number | null;
    //       fecha_desde: Date;
    //       fecha_hasta: Date;
    //       id_estado_estudio: number | null;
    //       id_tipo_estudio: number | null;
    //       id_nivel_estudio: number | null;
    //       id_tipo_curso: number | null;

    //     }) => ({
    //       id: obj.id,
    //       idEstudio: obj.id_rh_profesion,
    //       idCandidato: obj.id_rh_candidato,
    //       idUsuario: 0,
    //       idInstitucion: obj.id_rh_institucion,
    //       fecha_Desde: obj.fecha_desde,
    //       fecha_Hasta: obj.fecha_hasta,
    //       id_estado_estudio: obj.id_estado_estudio,
    //       id_tipo_estudio: obj.id_tipo_estudio,
    //       id_nivel_estudio: obj.id_nivel_estudio ? obj.id_nivel_estudio: 0,
    //       id_tipo_curso: obj.id_tipo_curso ? obj.id_tipo_curso : 0,
    //       accion: 0,
    //     }));

    //     this.myReferenceArray = [...newArr]
    //     this._storaged.set('datosEstudiosStorage', this.myReferenceArray);
    // }

    loading.close();


  }

  ngOnDestroy() {
    this.todosDatosCandidato.estudios = [...this.myReferenceArray]
    console.log('Destroy', this.todosDatosCandidato.estudios);
    this._storaged.set('todosCandidatoStorage',   this.todosDatosCandidato);
    // this._storaged.set('datosEstudiosStorage', this.myReferenceArray);
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

    this.datosEstudios.fecha_Desde = new Date;
    this.datosEstudios.fecha_Hasta = new Date;
  }else{
      this.messageService.info('Atención','Para agregar información sobre sus estudios debe llenar todos los campos ... Por favor verifique que no haya campos vacios o sin seleccionar.');
      this.fieldDatosEstudios.control.markAllAsTouched();
  }
}

  onSelectionInstitucion(){
    console.log('Hola');
  }


  public guardarProgreso(){
    this._storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
    // this._storaged.set('datosEstudiosStorage', this.myReferenceArray);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // const datosEstudios = this._storaged.get('datosEstudiosStorage');
    // if(datosEstudios && datosEstudios.length > 0){
    //   this.myReferenceArray = datosEstudios;
    //   console.log("Datos Estudios", this.datosEstudios);
    // }

  }

  public  borrarItem(index: number){
    this.myReferenceArray.splice(index, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
  }


  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }
}
