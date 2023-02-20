import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import * as _ from 'lodash';
import { NgForm} from '@angular/forms';
import { DatosAdicionalesCandidato, Licencia } from './interfaces/datos-adicionales';
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';

interface Pais{
  value: number;
  viewValue: string;
}
interface AniosExperiencia{
  id: number;
  descripcion: string;
}
interface AspiracionSalarial{
  id: number;
  descripcion: string;
}
interface FuenteReclutamiento{
  id: number;
  descripcion: string;
}
interface EntidadExpedicion{
  id: number;
  descripcion: string;
}
interface EPS{
  id: number;
  descripcion: string;
}
interface FondoPension{
  id: number;
  descripcion: string;
}
interface CajaCompensacion{
  id: number;
  descripcion: string;
}
interface Cesantia{
  id: number;
  descripcion: string;
}
interface GrupoSanguineo{
  id: number;
  descripcion: string;
}
interface ColorPiel{
  id: number;
  descripcion: string;
}
interface CategoriaLicencia{
  id: number;
  descripcion: string;
}
// interface Licencia{
//     id: number;
//     idCandidato: number;
//     idCategoria: number;
//     fechaVence: Date;
//     accion: number;
// }
// interface DatosAdicionalesCandidato{
//   id_rh_experiencia_sector: number | null;
//   id_rh_experiencia_equipo: number | null;
//   id_salario: number | null;
//   salario_especifico: number | null;
//   id_rh_fuente_reclutamiento: number | null;
//   tarjeta: string;
//   id_Entidad: number | null;
//   id_participacion_anterior: number;
//   id_trajo_hoja_vida: number;
//   id_disponibilidad_viaje: number;
//   runt: number;
//   idRhEps: number | null;
//   idRhFondoPension: number | null;
//   idRhFondoCaja: number | null;
//   idRhFondoCesantias: number | null;
//   licencia: string;
//   tipo_licencia: number | null;
//   fecha_vence_licencia: string;
//   id_rh_categoria: number | null;
//   id_rh_color_piel: number | null;
//   id_rh_grupo_sanguineo: number | null;
//   rh: number | null;
//   peso: number | null;
//   altura: number | null;
// }
@Component({
  selector: 'app-datos-adicionales-form',
  templateUrl: './datos-adicionales-form.component.html',
  styleUrls: ['./datos-adicionales-form.component.scss']
})
export class DatosAdicionalesFormComponent implements OnInit, OnChanges {

  @ViewChild('datosAdicionalesForm', { static: true })
  fieldDatosAdicionales!: NgForm;

  public idEmp: number = 3;
  public numRegla: number = 159;

  public  aniosExp: AniosExperiencia[] = [];
  public salarios: AspiracionSalarial[] = [];
  public fuentesReclutamiento: FuenteReclutamiento[] = [];
  public entidades: EntidadExpedicion[] = [];
  public epss: EPS[] = [];
  public fondosPension: FondoPension[] = [];
  public cajasCompensacion: CajaCompensacion[] = [];
  public cesantias: Cesantia[] = [];
  public categoriasLicencia: CategoriaLicencia[] = [];
  public gruposSanguineos: GrupoSanguineo[] = [];
  public coloresPiel: ColorPiel[] = [];


  public columnsReference: any[] = ["id", "fecha_vence", "categoria", 'borrar' ];
  public LICENCE_DATA: Licencia[] = [];

  public myReferenceArray: any[] = [];

  public setLicences: Licencia = {
    id: 0,
    idCandidato: 0,
    idCategoria: 0,
    fechaVence: new Date,
    accion: 0,
  }

 public disabledButtonNext: boolean = true;

 public todosCandidatoStorage: TodosDatosCandidato = {
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

//  public datosAdicionales: DatosAdicionalesCandidato = {
//   id_rh_experiencia_sector: null,
//   id_rh_experiencia_equipo: null,
//   id_salario: null,
//   salario_especifico: null,
//   id_rh_fuente_reclutamiento: null,
//   tarjeta: '',
//   id_Entidad: null,
//   id_participacion_anterior: 0,
//   id_trajo_hoja_vida: 0,
//   id_disponibilidad_viaje: 0,
//   runt: 0,
//   idRhEps: null,
//   idRhFondoPension: null,
//   idRhFondoCaja: null,
//   idRhFondoCesantias: null,
//   licencia: '',
//   tipo_licencia: null,
//   fecha_vence_licencia: '',
//   id_rh_categoria: null,
//   id_rh_color_piel: null,
//   id_rh_grupo_sanguineo: null,
//   rh: null,
//   peso: null,
//   altura: null,
//  }
  public tipo_licencia = 0;
  public candidatoId = 0;
  public licencia = '';
  public tarjeta = '';


  @Input() tipoCandidato: number = 0;

  public operacionesDisabled = true;

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    // correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    salario: /^\d{6,9}$/ // 6 a 9 numeros.
  }


  tiposLicencia = [
    { id: 1, descripcion: "Pública" },
    { id: 2, descripcion: "Privada" }
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

  colsAlt: number | undefined;

  gridByBreakpointAlt = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _storaged: SessionStorageService,
    private _addItemTable: AddLabelToTableService,
    private readonly messageService: MessagesService,
    private apiService: ApiService
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

  async ngOnInit(): Promise<void> {

    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const experienciaEspecifica = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'experiencia');
    if(experienciaEspecifica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de años de experiencia');
      return;
    }
    this.aniosExp = _.orderBy(experienciaEspecifica, ['id'], ['asc']);

    const aspiracionSalarial = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'rango_salario');
    if(aspiracionSalarial === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los rangos salariales');
      return;
    }
    this.salarios = _.orderBy(aspiracionSalarial, ['id'], ['asc']);

    const fuenteReclutamiento = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fuente_reclutamiento');
    if(fuenteReclutamiento === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las fuentes de reclutamiento');
      return;
    }
    this.fuentesReclutamiento = _.orderBy(fuenteReclutamiento, ['id'], ['asc']);

    const entidadExpedicion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'entidad');
    if(entidadExpedicion === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las entidades de expedición');
      return;
    }
    this.entidades = _.orderBy(entidadExpedicion, ['id'], ['asc']);

    const eps = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'eps');
    if(eps === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las EPS');
      return;
    }
    this.epss = _.orderBy(eps, ['id'], ['asc']);

    const fondoPension = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_pension');
    if(fondoPension === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los fondos de pensión');
      return;
    }
    this.fondosPension = _.orderBy(fondoPension, ['id'], ['asc']);

    const cajaCompensacion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_caja');
    if(cajaCompensacion === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las cajas de compensación');
      return;
    }
    this.cajasCompensacion = _.orderBy(cajaCompensacion, ['id'], ['asc']);

    const cesantia = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_cesantias');
     if(cesantia === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las cesantias');
      return;
    }
    this.cesantias = _.orderBy(cesantia, ['id'], ['asc']);

    const categoriaLicencia = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'categoria_licencia');
     if(categoriaLicencia === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las categorías de licencia');
      return;
    }
    this.categoriasLicencia = _.orderBy(categoriaLicencia, ['id'], ['asc']);

    const grupoSanguineo = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'grupo_sanguineo');
     if(grupoSanguineo === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de grupo sanguineo');
      return;
    }
    this.gruposSanguineos = _.orderBy(grupoSanguineo, ['id'], ['asc']);

    const colorPiel = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'color_piel');
     if(colorPiel === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de color de piel');
      return;
    }
    this.coloresPiel = _.orderBy(colorPiel, ['id'], ['asc']);



    // const licenciasCandidato = this._storaged.get('datosLicencia');
    // const datosAdicionales = this._storaged.get('datosAdicionalesStorage');
    this.todosCandidatoStorage = this._storaged.get('todosCandidatoStorage');
    console.log('Todos los datos en adicionales', this.todosCandidatoStorage);
    const getCategoriasLic = this.todosCandidatoStorage.categorias;
    // const candidatoExistente = this._storaged.get('candidatoExistente');
    console.log("Datos licencias storage", getCategoriasLic);

    if(getCategoriasLic && getCategoriasLic.length > 0){
      // const newArr = getCategoriasLic.map((obj: {id: number; idCandidato: number;  idCategoria: number;  fechaVence: Date;}) => ({
      //   id: obj.id,
      //   idCandidato: obj.idCandidato,
      //   idCategoria: obj.idCategoria,
      //   fechaVence: obj.fechaVence,
      //   accion: 0
      // }));

      // this.myReferenceArray = [...newArr]
      this.myReferenceArray = [...getCategoriasLic]
      console.log('categories',this.myReferenceArray);

    }

    // if(this.todosCandidatoStorage && this.todosCandidatoStorage != null){
    //   // this.todosCandidatoStorage = this.todosCandidatoStorage;

    //   // console.log("Datos Adicionales", this.todosCandidatoStorage);

    //   // if(licenciasCandidato && licenciasCandidato.length > 0){
    //   //   this.myReferenceArray = licenciasCandidato;

    //   //   console.log("Datos Adicionales licencia 2", this.myReferenceArray);
    //   // }
    //    }
    //    else if(this.todosCandidatoStorage  && this.todosCandidatoStorage != null){

    //     // this.candidatoId = this.todosCandidatoStorage.candidato
    //     // this.todosCandidatoStorage.candidato.id_rh_experiencia_sector = candidatoExistente[0].id_rh_experiencia_sector ? candidatoExistente[0].id_rh_experiencia_sector: 0;
    //     // this.todosCandidatoStorage.candidato.id_rh_experiencia_equipo = candidatoExistente[0].id_rh_experiencia_equipo;
    //     // this.todosCandidatoStorage.candidato.id_salario = candidatoExistente[0].id_salario;
    //     // this.todosCandidatoStorage.candidato.salario_especifico = candidatoExistente[0].salario;//verificar
    //     // this.todosCandidatoStorage.candidato.id_rh_fuente_reclutamiento = candidatoExistente[0].id_rh_fuente_reclutamiento;
    //     // this.todosCandidatoStorage.candidato.tarjeta = candidatoExistente[0].tarjeta;
    //     // this.todosCandidatoStorage.candidato.id_Entidad = candidatoExistente[0].id_rh_entidad;//verificar
    //     // this.todosCandidatoStorage.candidato.id_participacion_anterior = candidatoExistente[0].id_participacion_anterior;
    //     // this.todosCandidatoStorage.candidato.id_trajo_hoja_vida = candidatoExistente[0].id_trajo_hoja_vida;
    //     // this.todosCandidatoStorage.candidato.id_disponibilidad_viaje = candidatoExistente[0].id_disponibilidad_viaje;
    //     // this.todosCandidatoStorage.candidato.runt = candidatoExistente[0].runt;
    //     // this.todosCandidatoStorage.candidato.idRhEps = candidatoExistente[0].id_rh_eps;
    //     // this.todosCandidatoStorage.candidato.idRhFondoPension = candidatoExistente[0].id_rh_fondo_pension;
    //     // this.todosCandidatoStorage.candidato.idRhFondoCaja = candidatoExistente[0].id_rh_fondo_caja;
    //     // this.todosCandidatoStorage.candidato.idRhFondoCesantias = candidatoExistente[0].id_rh_fondo_cesantias;
    //     // this.todosCandidatoStorage.candidato.licencia = candidatoExistente[0].licencia;
    //     // this.todosCandidatoStorage.candidato.tipo_licencia = candidatoExistente[0].tipo_licencia;
    //     // this.todosCandidatoStorage.candidato.fecha_vence_licencia = candidatoExistente[0].fecha_vence_licencia;
    //     // this.todosCandidatoStorage.candidato.id_rh_categoria = candidatoExistente[0].id_rh_categoria;
    //     // this.todosCandidatoStorage.candidato.id_rh_color_piel = candidatoExistente[0].id_rh_color_piel;
    //     // this.todosCandidatoStorage.candidato.id_rh_grupo_sanguineo = candidatoExistente[0].id_rh_grupo_sanguineo;
    //     // this.todosCandidatoStorage.candidato.rh = candidatoExistente[0].rh;
    //     // this.todosCandidatoStorage.candidato.peso = candidatoExistente[0].peso;
    //     // this.todosCandidatoStorage.candidato.altura = candidatoExistente[0].altura;
    //     const getCategoriasLic = await this.getAnyInformation('/hojadevida/categorias/' + this.candidatoId);

    //     const newArr = getCategoriasLic.map((obj: {id: number; id_rh_candidato: number;  id_rh_categoria: number; categoria: string, fecha_vencimiento: Date;}) => ({
    //       id: obj.id,
    //       idCandidato: obj.id_rh_candidato,
    //       idCategoria: obj.id_rh_categoria,
    //       fechaVence: obj.fecha_vencimiento,
    //       accion: 0
    //     }));

    //     this.myReferenceArray = [...newArr]

    // }
    // this._storaged.set('datosAdicionalesStorage',   this.datosAdicionales);
    // this._storaged.set('datosLicencia', this.myReferenceArray);
    loading.close();
  }


  public ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    this.todosCandidatoStorage.categorias = [...this.myReferenceArray]
    this._storaged.set('todosCandidatoStorage',   this.todosCandidatoStorage);
    // this._storaged.set('datosLicencia', this.myReferenceArray);
  }

  public newLicence(event: any){
    if(event){
      this.myReferenceArray = [];
    }
  }
  public chooseType(event: any){
    if(event){
      this.myReferenceArray = [];
    }
  }
  addReference() {
    this.LICENCE_DATA.push(this.setLicences);

    this.myReferenceArray.push(this.setLicences);
    this.setLicences = {
      id: 0,
      idCandidato: 0,
      idCategoria: 0,
      fechaVence: new Date,
      accion: 0,
    };
    this.myReferenceArray = [...this.myReferenceArray];
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

  public  borrarItem(index: number){
    this.myReferenceArray.splice(index, 1);
    this.myReferenceArray = [...this.myReferenceArray];

  }

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

  // public getLocalStorage(){
  //   // console.log('Cargar Datos Adicionales', this.datosAdicionales);
  //   // this.datosAdicionales = this._storaged.get('datosAdicionalesStorage');
  // }
  public guardarProgreso(){

    if(!this.fieldDatosAdicionales.valid){

      this.messageService.error('Error','Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.');
      this.fieldDatosAdicionales.control.markAllAsTouched();
    }else{

      // this._storaged.set('datosAdicionalesStorage', this.datosAdicionales);
      this.todosCandidatoStorage.categorias = [...this.myReferenceArray]
      this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
      // this._storaged.set('datosLicencia', this.myReferenceArray);
      this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
      this.disabledButtonNext = false;
    }

  }

}
