import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';

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

// interface ReferenceList {
//   tipo_referencia: number;
//   nombre: string;
//   celular: string;
//   telefono: string;
//   correo: string;
//   empresa: string;
//   cargo: string;
//   tiempo_laborado: string;
//   motivo_retiro: string;
//   notas: string;

// }

@Component({
  selector: 'app-referencias-form',
  templateUrl: './referencias-form.component.html',
  styleUrls: ['./referencias-form.component.scss']
})
export class ReferenciasFormComponent implements OnInit {
  @ViewChild('addReferenceData', { static: true })
  fieldDatosReferencias!: NgForm;
  public disabledButtonNext: boolean = true;
  public idEmp: number = 3;
  public candidatoId = 0;

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

  public datosReferencias: Referencias = {
    id: 0,
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 1,
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
    tipo: 1,
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
    // correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
    private messageService: MessagesService,
    private apiService: ApiService
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


  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    // this.getLocalStorage();
    // const datosReferencias = this._storaged.get('datosReferenciasStorage');
    // const candidatoExistente = this._storaged.get('candidatoExistente');
    this.todosDatosCandidato =  this._storaged.get('todosCandidatoStorage');
    if(this.todosDatosCandidato.referencias && this.todosDatosCandidato.referencias.length > 0){
      this.myReferenceArray = [...this.todosDatosCandidato.referencias];
      console.log("Datos referencias", this.myReferenceArray);
    }
    // else if(candidatoExistente  && candidatoExistente.length > 0){

    //   this.candidatoId = candidatoExistente[0].id


    //   const getInfoFamiliar = await this.getAnyInformation('/hojadevida/referencias/' + this.candidatoId);

    //   const newArr = getInfoFamiliar.map((obj: {
    //     id: number;
    //     cargo: string;
    //     celular: string;
    //     empresa: string;
    //     id_rh_candidato: number;
    //     mail: string;
    //     motivo_retiro: string;
    //     nombre: string;
    //     observaciones: string;
    //     observaciones_det: string;
    //     telefono: string;
    //     tiempo_laborado: string;
    //     tipo: number;
    //     tipo_ref: string;
    //   }) => ({

    //     id: obj.id,
    //     idCandidato: obj.id_rh_candidato,
    //     nombre: obj.nombre,
    //     celular: obj.celular,
    //     telefono: obj.telefono,
    //     mail: obj.mail,
    //     tipo: obj.tipo,
    //     idUsuario: 0,
    //     empresa: obj.empresa,
    //     Cargo: obj.cargo,
    //     Observaciones: obj.observaciones,
    //     TiempoLaborado: obj.tiempo_laborado,
    //     MotivoRetiro: obj.motivo_retiro,
    //     accion: 0,
    //   }));

    //   this.myReferenceArray = [...newArr]
    //   this._storaged.set('datosReferenciasStorage', this.myReferenceArray);
    //   }
    // // console.log('Cargar Datos Adicionales', this.datosReferencias);
    // this.myReferenceArray = this._storaged.get('datosReferenciasStorage');
  loading.close();

  }

  ngOnDestroy() {
    this.todosDatosCandidato.referencias = [...this.myReferenceArray]
    console.log('Destroy', this.todosDatosCandidato.referencias);
    this._storaged.set('todosCandidatoStorage',   this.todosDatosCandidato);
    // this._storaged.set('datosReferenciasStorage', this.myReferenceArray);
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
    if(this.fieldDatosReferencias.valid){
    this.REFERENCE_DATA.push(this.setReferences);
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
  }else{
    this.messageService.info('Atención','Para agregar información sobre sus referencias debe llenar todos los campos ... Por favor verifique que no haya campos vacios o sin seleccionar.');
    this.fieldDatosReferencias.control.markAllAsTouched();
}


  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];

  }

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

  public guardarProgreso(){

    this._storaged.set('todosCandidatoStorage',   this.todosDatosCandidato);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){

    // const datosReferencias = this._storaged.get('datosReferenciasStorage');
    // if(datosReferencias && datosReferencias.length > 0){
    //   this.myReferenceArray = datosReferencias;
    //   console.log("Datos referencias", this.myReferenceArray);
    // }
    // // console.log('Cargar Datos Adicionales', this.datosReferencias);
    // // this.myReferenceArray = this._storaged.get('datosReferenciasStorage');

  }


}
