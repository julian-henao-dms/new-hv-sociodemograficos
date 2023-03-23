import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { DatosBasicosCandidato, Idioma, IdiomaCandidato, Perfiles, TodosDatosCandidato } from "./interfaces/candidato.interface";
import * as _ from 'lodash';
import { MatStepper } from '@angular/material/stepper';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import {MatOption} from '@angular/material/core';


interface TipoCandidato{
  id: number;
  descripcion: string;
}
interface TipoDocumento{
  id: string;
  descripcion: string;
}
interface PaisExp{
  id: number;
  codigo: string;
  descripcion: string;
  id_cot_cliente_pais:number;
}
interface DeptoExp{
  id: number;
  descripcion: string;
}
interface Pais{
  id: number;
  codigo: string;
  descripcion: string;
  id_cot_cliente_pais:number;
}
interface Depto{
  id: number;
  descripcion: string;
}
interface Ciudad{
  id: number;
  descripcion: string;
}
interface Barrio{
  id: string;
  descripcion: string;
}
interface NivelAcademico{
  id: number;
  descripcion: string;
}
interface LenguajeExtranjera{
  id: number;
  descripcion: string;
}
interface EstadoCivil{
  id: number;
  descripcion: string;
}
interface Cargo{
  id: number;
  descripcion: string;
}
interface AniosExperiencia{
  id: number;
  descripcion: string;
}
interface Perfil{
  id: number;
  descripcion: string;
}
// interface DatosBasicosCandidato {
//   id:number;
//   emp: number;
//   id_usuario: number;
//   id_tipo_candidato: number | null;
//   id_rh_tipo_documento: number | null;//*
//   nit: string;  //*
//   fecExpedicion: Date;//*
//   lugarExpedicion: string;//*
//   idCotClientePais: number | null;//
//   nombre: string;//*
//   apellido: string;//*
//   genero: number | null;//*
//   fecha_nacimiento: Date;//*
//   idRhEstadoCivil: number | null;//*
//   telefono: string;//*
//   mail: string;//*
//   celular: string;//*
//   direccion: string;//*
//   id_cot_cliente_pais: number | null;//*
//   id_cot_cliente_barrio: number | null;//*
//   id_rh_experiencia: number | null;//*
//   id_rh_nivel_academico: number | null;//*
//   id_rh_perfil: number | null;// cargo?
//   depto:number | null;
//   deptoExp:number | null;
//   pais:number | null;
//   paisExp:number | null;
//   fuente:string;
// }
@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.scss']
})
export class DatosBasicosFormComponent implements OnInit {

  @Output() changeSelect = new EventEmitter<any>();
  @ViewChild('datosBasicosForm', { static: true })
  fieldDatosBasicos!: NgForm;

  @ViewChild('stepper') stepper!: MatStepper;
  @Output() activeTab = new EventEmitter<boolean>();
  @Output() flexibleTabs = new EventEmitter<boolean>();
public mostrarOpciones = true;

  public typeCandidato: number = 0;
  public candidatoId = 0;

  public idEmp: number = 3;
  public numRegla: number = 159;
  public paises: Pais[] = [];
  public deptos: Depto[] = [];
  public paisesExp: PaisExp[] = [];
  public deptosExp: DeptoExp[] = [];
  public tiposDocumento: TipoDocumento[] = [];
  public estados: EstadoCivil[] = [];
  public aniosExp: AniosExperiencia[] = [];
  public nivelesAcademia: NivelAcademico[] = [];
  public cargos: Cargo[] = [];
  public lenguas: LenguajeExtranjera[] = [];
  public ciudades: Ciudad[] = [];
  public ciudadesExp: Ciudad[] = [];
  public barrios: Barrio[] = [];
  public idiomasPrevios: Idioma[] = [];


  public todosDatosCandidato: TodosDatosCandidato = {
    candidato:{
      id:0,
      emp: 3,
      id_usuario: 1,
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
      fecha_vence_licencia: new Date,
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

  public newIdiomas:any[] = [];
// public datosCandidato: DatosBasicosCandidato = {
//   id:0,
//   emp: 0,
//   id_usuario: 0,
//   id_tipo_candidato: null,
//   id_rh_tipo_documento: null,
//   nit: '',
//   estado: 1,
//   fecExpedicion: new Date,
//   lugarExpedicion: '',
//   idCotClientePais: null,
//   nombre: '',
//   apellido: '',
//   genero: null,
//   fecha_nacimiento: new Date,
//   idRhEstadoCivil: null,
//   telefono: '',
//   mail: '',
//   celular: '',
//   direccion: '',
//   id_cot_cliente_pais: null,
//   id_cot_cliente_barrio: null,
//   id_rh_experiencia: null,
//   id_rh_nivel_academico: null,
//   id_rh_perfil: null,
//   pais: null,
//   paisExp: null,
//   depto: null,
//   deptoExp: null,
//   fuente: ''
// }


public licenceArray: any[] = [];
public studiesArray: any[] = [];
public referenceArray: any[] = [];
public idPerfilPrevio: any[] = [];
public perfiles: Perfil[] = [];
public cargosArray: any[] = [];
public familyArray: any[] = [];

public idiomasCandidatoExistente: IdiomaCandidato = {
  id: 0,
  idIdi:0,
  id_rh_candidato: 0,
  id_rh_idioma: 0,
  descripcion: '',
  };

public otrosCargos: Perfiles = {
    id: 0,
    idPerfil: 0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
  }

public paisExpedicion = 0;
public depto = 0;
public ciudad = 0;


public idIdiPrevio: any[] = [];
public idiomasArray: any[] = [];
public disabledButtonNext: boolean = true;

public idiomasCandidato: Idioma = {
    id: 0,
    idIdi:0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
    };

  colsAlt : number | undefined;

  gridByBreakpointAlt = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  cols : number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };

  public tiposCandidato: TipoCandidato[] = [
    {id: 0, descripcion: 'Personal Táctico y Soporte'},
    {id: 1, descripcion: 'Personal Operativo'},

  ];

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    // correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/ // 7 a 14 numeros.
  }
  public todosLugares: any;


  constructor(
    private storaged: SessionStorageService,
    private breakpointObserver: BreakpointObserver,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService
    ){
    //


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

  ngAfterViewInit() {

  }

  async ngOnInit(): Promise<void> {
  console.log('1a');

   const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
   console.log('2a');
   const idEmp = this.idEmp;
   const numRegla = this.numRegla


   const paises = await this.getAnyInformation('/pais/' + idEmp);
   if(paises === null){
     this.messageService.error('Error', 'Error interno del servidor al cargar los paises');
     return;
    }
    this.paises = _.orderBy(paises, ['id'], ['asc']);

   const paisesExp = await this.getAnyInformation('/pais/' + idEmp);
   if(paisesExp === null){
     this.messageService.error('Error', 'Error interno del servidor al cargar los paisesExp');
     return;
    }
    this.paisesExp = _.orderBy(paisesExp, ['id'], ['asc']);

    const tipoDocumento = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'tipo_documento');
    if(tipoDocumento === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los tipos de documento');
         return;
        }
    this.tiposDocumento = _.orderBy(tipoDocumento, ['id'], ['asc']);

    const estadoCivil = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'estado_civil');
    if(estadoCivil === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de estado civil');
         return;
        }
    this.estados = _.orderBy(estadoCivil, ['id'], ['asc']);

    const experienciaEspecifica = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'experiencia');
    if(experienciaEspecifica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de experiencia');
      return;
    }
    this.aniosExp = _.orderBy(experienciaEspecifica, ['id'], ['asc']);

    const nivelAcademico = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'academico');
    if(nivelAcademico === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los niveles académicos');
      return;
    }
    this.nivelesAcademia = _.orderBy(nivelAcademico, ['id'], ['asc']);


    const lenguaExtranjera = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'idioma');
    if(lenguaExtranjera === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los idiomas');
      return;
    }
    this.lenguas = _.orderBy(lenguaExtranjera, ['id'], ['asc']);

    const cargoAplica = await this.getAnyInformation('/hojadevida/perfiles/' + idEmp);
    if(cargoAplica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los perfiles');
      return;
    }
    this.cargos = _.orderBy(cargoAplica, ['id'], ['asc']);

    console.log('3a');
    console.log("idiomas previos consultado BD", this.idiomasPrevios);
    // const datosBasicosStorage = this.storaged.get('datosCandidatoStorage');
    // const candidatoExistente = this.storaged.get('candidatoExistente');
    const datosTodosCandidatoStorage = this.storaged.get('todosCandidatoStorage');
    // this.todosDatosCandidato =  this.storaged.get('todosCandidatoStorage');
    console.log('3ba');
    // console.log("Que hay aquí?", datosTodosCandidatoStorage);
    // console.log("Que hay aquí 2?",  this.todosDatosCandidato);
    if(datosTodosCandidatoStorage && datosTodosCandidatoStorage != null){
      this.todosDatosCandidato = datosTodosCandidatoStorage;
      console.log("Que hay aquí 3?",  this.todosDatosCandidato);
    }
    // const idiomasCandidatoStorage = this.storaged.get('idiomasStorage');
    console.log('Que hay al iniciar',this.todosDatosCandidato);
    console.log('4a');
    console.log('lenguas', this.lenguas);
    // console.log("Datos basicos", datosBasicosStorage);
    if(this.todosDatosCandidato.candidato.nit != ''){
      console.log('5ba');
      // this.todosDatosCandidato =  this.storaged.get('todosCandidatoStorage');
      const getIdiomas = this.todosDatosCandidato.idiomas.filter(idioma => idioma.accion == 0);
      console.log('Idiomas filtrados en on', getIdiomas);

      // console.log("exitente init antes del if ",candidatoExistente);
      // console.log("Idiomas en cambio pestaña", getIdiomas);
      if(getIdiomas && getIdiomas.length > 0){
        // const getIdioB: Idioma[] = getIdiomas.map((idioma: IdiomaCandidato) => {
        //   return {
        //     "id": idioma.id,
        //     "idIdi": idioma.id_rh_idioma,
        //     "idCandidato": idioma.id_rh_candidato,
        //     "idUsuario": 0,
        //     "accion": 0
        //   };
        // });
        console.log('idiomas storage', getIdiomas);
        const getIdio = getIdiomas.map((element: { idIdi: number; }) => element.idIdi);
        this.idIdiPrevio = [...getIdio];
        console.log('Idiomas mapeados desde storage', this.idIdiPrevio);
        // console.log('Idiomas mapeados desde storage', getIdioB);
      }
      // this.todosDatosCandidato = this.todosDatosCandidato;
      console.log('Entro awqui condici{on iti');
      console.log("Datos BAsicos", this.todosDatosCandidato);
      if(this.todosDatosCandidato.candidato.estado === 2){
        this.activeTab.emit(false);
      }
      console.log('5a');
      this.todosLugares =  await this.getAnyInformation('/pais/all/' + this.idEmp);
      console.log('Datos paises deptos y ciudad', this.todosLugares);
      const ciudadDeptoExp = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.todosDatosCandidato.candidato.idCotClientePais);
      const ciudadDeptoUbiq = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.todosDatosCandidato.candidato.id_cot_cliente_pais);

      const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais
      const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais

      const deptoPais = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudad);
      const deptoPaisExp = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudadExp);
      const paisCandidato = deptoPais.id_cot_cliente_pais;
      const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

      this.todosDatosCandidato.candidato.paisExp = paisCandidatoExp;
      this.onSelectionChangePaisExp(paisCandidatoExp);
      this.todosDatosCandidato.candidato.deptoExp = deptoCiudadExp;
      this.onSelectionChangeDeptoExp(deptoCiudadExp)
      this.todosDatosCandidato.candidato.idCotClientePais = this.todosDatosCandidato.candidato.idCotClientePais;

      this.todosDatosCandidato.candidato.pais = paisCandidato;
      this.onSelectionChangePais(paisCandidato);
      this.todosDatosCandidato.candidato.depto = deptoCiudad;
      this.onSelectionChangeDepto(deptoCiudad)
      this.todosDatosCandidato.candidato.id_cot_cliente_pais = this.todosDatosCandidato.candidato.id_cot_cliente_pais;
      this.onSelectionChangeCiudad(this.todosDatosCandidato.candidato.id_cot_cliente_pais);
      this.todosDatosCandidato.candidato.id_cot_cliente_barrio = this.todosDatosCandidato.candidato.id_cot_cliente_barrio;


      if(this.todosDatosCandidato.idiomas && this.todosDatosCandidato.idiomas.length > 0){

        const getIdio = this.todosDatosCandidato.idiomas.map((element: { idIdi: number; }) => element.idIdi)
        console.log('como llegan los idiomas', getIdio);
        this.idIdiPrevio = [...getIdio];

      //  const idiomasTotal = this.compararArrays(this.lenguas, this.idIdiPrevio);

        this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
          ...this.idiomasCandidato, idIdi
        }));

        // console.log('Idiomas total en init',idiomasTotal);

      // this.todosDatosCandidato.idiomas = idiomasTotal;
      this.todosDatosCandidato.idiomas = [...this.idiomasArray]

      }
      // const getIdiomas = await this.getAnyInformation('/hojadevida/idiomas/' + this.todosDatosCandidato.candidato.id);
      // console.log('idiomas carga en init',getIdiomas);
      // const getIdio = getIdiomas.map((element: { id_rh_idioma: number; }) => element.id_rh_idioma)
      // this.idIdiPrevio = [...getIdio];

      // this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
      //   ...this.idiomasCandidato, idIdi
      // }));

      console.log('idiomas en init ', this.todosDatosCandidato.idiomas);

      this.todosDatosCandidato.candidato.id_usuario = 1;
    }else{
      this.todosDatosCandidato = this.todosDatosCandidato
    }
    // else if(candidatoExistente  && candidatoExistente.length > 0){
    //   console.log('Entra en candidato existente init');
    //   // this.storaged.set('candidatoExistente', candidatoExistente);
    //   this.datosCandidato.id = candidatoExistente[0].id;
    //   this.datosCandidato.nit = candidatoExistente[0].nit;
    //   this.datosCandidato.id_rh_tipo_documento = candidatoExistente[0].id_rh_tipo_documento;
    //   this.datosCandidato.nombre = candidatoExistente[0].nombre;
    //   this.datosCandidato.apellido = candidatoExistente[0].apellido;
    //   this.datosCandidato.genero = candidatoExistente[0].genero;
    //   this.datosCandidato.fecha_nacimiento = candidatoExistente[0].fecha_nacimiento;
    //   // this.datosCandidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
    //   this.datosCandidato.direccion = candidatoExistente[0].direccion;
    //   this.datosCandidato.telefono = candidatoExistente[0].telefono;
    //   this.datosCandidato.celular = candidatoExistente[0].celular;
    //   this.datosCandidato.mail = candidatoExistente[0].mail;
    //   this.datosCandidato.id_rh_perfil = candidatoExistente[0].id_rh_perfil;
    //   this.datosCandidato.idCotClientePais = candidatoExistente[0].id_cot_cliente_pais2;
    //   this.datosCandidato.id_cot_cliente_pais = candidatoExistente[0].id_cot_cliente_pais;
    //   this.datosCandidato.id_rh_nivel_academico = candidatoExistente[0].id_rh_nivel_academico;
    //   this.datosCandidato.id_rh_experiencia = candidatoExistente[0].id_rh_experiencia;
    //   this.datosCandidato.id_tipo_candidato = candidatoExistente[0].id_tipo_candidato;
    //   this.datosCandidato.idRhEstadoCivil = candidatoExistente[0].id_rh_estado_civil;
    //   this.datosCandidato.fecExpedicion = candidatoExistente[0].fecha_exp_cedula;
    //   this.datosCandidato.lugarExpedicion = candidatoExistente[0].lugar_exp_cedula;
    //   this.datosCandidato.estado = candidatoExistente[0].estado;

    //   // const estadoCandidato = candidatoExistente[0].estado;
    //   if(this.datosCandidato.estado === 2){
    //     this.activeTab.emit(false);
    //   }
    //   // if(estadoCandidato === 2){
    //   //   this.activeTab.emit(false);
    //   // }

    //   this.candidatoId = candidatoExistente[0].id
    //   const getIdiomas = await this.getAnyInformation('/hojadevida/idiomas/' + this.candidatoId);
    //   const getIdio = getIdiomas.map((element: { id_rh_idioma: number; }) => element.id_rh_idioma)
    //   this.idIdiPrevio = [...getIdio];
    //   // this.storaged.set('idiomasStorage', this.idIdiPrevio);

    //   this.todosLugares =  await this.getAnyInformation('/pais/all/' + this.idEmp);
    //   console.log('Datos paises deptos y ciudad', this.todosLugares);
    //   const ciudadDeptoExp = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.datosCandidato.idCotClientePais);
    //   const ciudadDeptoUbiq = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.datosCandidato.id_cot_cliente_pais);

    //   const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais
    //   const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais

    //   const deptoPais = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudad);
    //   const deptoPaisExp = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudadExp);
    //   const paisCandidato = deptoPais.id_cot_cliente_pais;
    //   const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

    //   this.datosCandidato.paisExp = paisCandidatoExp;
    //   this.onSelectionChangePaisExp(paisCandidatoExp);
    //   this.datosCandidato.deptoExp = deptoCiudadExp;
    //   this.onSelectionChangeDeptoExp(deptoCiudadExp)
    //   this.datosCandidato.idCotClientePais = this.datosCandidato.idCotClientePais;

    //   this.datosCandidato.pais = paisCandidato;
    //   this.onSelectionChangePais(paisCandidato);
    //   this.datosCandidato.depto = deptoCiudad;
    //   this.onSelectionChangeDepto(deptoCiudad)
    //   this.datosCandidato.id_cot_cliente_pais = this.datosCandidato.id_cot_cliente_pais;
    //   this.onSelectionChangeCiudad(this.datosCandidato.id_cot_cliente_pais);
    //   this.datosCandidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
    //   // this.storaged.set('datosCandidatoStorage', this.datosCandidato);
    //   console.log("Y aquí que?", this.datosCandidato);
    //   this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
    //     ...this.idiomasCandidato, idIdi
    //   }));



    // this.storaged.set('datosCandidatoStorage', this.datosCandidato);
    // this.storaged.set('idiomasStorage', this.idiomasArray);


    // }

    // const getIdiomas = this.storaged.get('idiomasStorage');

  loading.close();

  // this.datosCandidato = this.storaged.get('datosCandidatoStorage');
  // this.idiomasArray = this.storaged.get('idiomasStorage');
  }


  public ngOnChanges(){

  }

  public async search(): Promise<void>{

    this.storaged.clear();
    if(this.todosDatosCandidato.candidato.nit !== ''){
      this.messageService.info("Atencion", "Estamos cargando los datos del candidato");
      const idEmp = this.idEmp;
      const candidatoExistente = await this.getAnyInformation('/hojadevida/candidato/0?identificacion=' + this.todosDatosCandidato.candidato.nit);
    console.log(candidatoExistente);
      console.log('Entro awqui condici{on search');
      console.log("1 Prueba de carga de candidato ",this.todosDatosCandidato);
      console.log("2 Prueba de carga de candidato ",candidatoExistente);
      if(candidatoExistente  && candidatoExistente.length > 0){
        console.log('Entra en candidato existente search');
        // this.storaged.set('candidatoExistente', candidatoExistente);
        this.flexibleTabs.emit(false);
        this.todosDatosCandidato.candidato.id = candidatoExistente[0].id;
        this.todosDatosCandidato.candidato.emp = idEmp;
        this.todosDatosCandidato.candidato.nit = candidatoExistente[0].nit;
        this.todosDatosCandidato.candidato.id_rh_tipo_documento = candidatoExistente[0].id_rh_tipo_documento;
        this.todosDatosCandidato.candidato.nombre = candidatoExistente[0].nombre;
        this.todosDatosCandidato.candidato.apellido = candidatoExistente[0].apellido;
        this.todosDatosCandidato.candidato.genero = candidatoExistente[0].genero;
        this.todosDatosCandidato.candidato.fecha_nacimiento = candidatoExistente[0].fecha_nacimiento;
        // this.todosDatosCandidato.candidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
        this.todosDatosCandidato.candidato.direccion = candidatoExistente[0].direccion;
        this.todosDatosCandidato.candidato.telefono = candidatoExistente[0].telefono;
        this.todosDatosCandidato.candidato.celular = candidatoExistente[0].celular;
        this.todosDatosCandidato.candidato.mail = candidatoExistente[0].mail;
        this.todosDatosCandidato.candidato.id_rh_perfil = candidatoExistente[0].id_rh_perfil;
        this.todosDatosCandidato.candidato.idCotClientePais = candidatoExistente[0].id_cot_cliente_pais2;
        this.todosDatosCandidato.candidato.id_cot_cliente_pais = candidatoExistente[0].id_cot_cliente_pais;
        this.todosDatosCandidato.candidato.id_rh_nivel_academico = candidatoExistente[0].id_rh_nivel_academico;
        this.todosDatosCandidato.candidato.id_rh_experiencia = candidatoExistente[0].id_rh_experiencia;
        this.todosDatosCandidato.candidato.id_tipo_candidato = candidatoExistente[0].id_tipo_candidato;
        // if(this.todosDatosCandidato.candidato.id_tipo_candidato == 1){
        //   this.changeSelect.emit({'data':false});
        // }
        this.todosDatosCandidato.candidato.idRhEstadoCivil = candidatoExistente[0].id_rh_estado_civil;
        this.todosDatosCandidato.candidato.fecExpedicion = candidatoExistente[0].fecha_exp_cedula;
        this.todosDatosCandidato.candidato.lugarExpedicion = candidatoExistente[0].lugar_exp_cedula;
        const estadoCandidato = candidatoExistente[0].estado;
        if(estadoCandidato === 2){
          this.activeTab.emit(false);
        }
        this.todosLugares =  await this.getAnyInformation('/pais/all/' + this.idEmp);

        this.candidatoId = candidatoExistente[0].id


      const ciudadDeptoExp = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.todosDatosCandidato.candidato.idCotClientePais);
      const ciudadDeptoUbiq = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.todosDatosCandidato.candidato.id_cot_cliente_pais);

      const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais
      const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais

      const deptoPais = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudad);
      const deptoPaisExp = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudadExp);
      const paisCandidato = deptoPais.id_cot_cliente_pais;
      const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

      this.todosDatosCandidato.candidato.paisExp = paisCandidatoExp;
      this.onSelectionChangePaisExp(paisCandidatoExp);
      this.todosDatosCandidato.candidato.deptoExp = deptoCiudadExp;
      this.onSelectionChangeDeptoExp(deptoCiudadExp)
      this.todosDatosCandidato.candidato.idCotClientePais = this.todosDatosCandidato.candidato.idCotClientePais;

      this.todosDatosCandidato.candidato.pais = paisCandidato;
      this.onSelectionChangePais(paisCandidato);
      this.todosDatosCandidato.candidato.depto = deptoCiudad;
      this.onSelectionChangeDepto(deptoCiudad)
      this.todosDatosCandidato.candidato.id_cot_cliente_pais = this.todosDatosCandidato.candidato.id_cot_cliente_pais;
      this.onSelectionChangeCiudad(this.todosDatosCandidato.candidato.id_cot_cliente_pais);
      this.todosDatosCandidato.candidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;

// idiomas
      const getIdiomas = await this.getAnyInformation('/hojadevida/idiomas/' + this.candidatoId);
      const getIdioB: Idioma[] = getIdiomas.map((idioma: IdiomaCandidato) => {
        return {
          "id": idioma.id,
          "idIdi": idioma.id_rh_idioma,
          "idCandidato": idioma.id_rh_candidato,
          "idUsuario": 0,
          "accion": 0
        };
      });

      const getIdio = getIdiomas.map((element: { id_rh_idioma: number; }) => element.id_rh_idioma)
      this.idIdiPrevio = [...getIdio];


      console.log("id previo en search",this.idIdiPrevio);
      console.log("id B previo en search", getIdioB);
      this.idiomasPrevios = [...getIdioB];
      console.log("idiomas previos consultado BD", this.idiomasPrevios);
      this.storaged.set('idiomasOriginales',this.idiomasPrevios);



      // const idiomasTotal = this.compararArrays(this.lenguas, this.idIdiPrevio);
      this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
        ...this.idiomasPrevios, idIdi
      }));
      // this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
      //   ...this.idiomasCandidato, idIdi
      // }));
console.log('Idiomas total en search',this.idiomasArray);
      // this.todosDatosCandidato.idiomas = idiomasTotal;
      this.todosDatosCandidato.idiomas = [...this.idiomasArray];

//Fin idiomas

      // Datos adicionales
      this.todosDatosCandidato.candidato.id_rh_experiencia_sector = candidatoExistente[0].id_rh_experiencia_sector ? candidatoExistente[0].id_rh_experiencia_sector: 0;
      this.todosDatosCandidato.candidato.id_rh_experiencia_equipo = candidatoExistente[0].id_rh_experiencia_equipo;
      this.todosDatosCandidato.candidato.id_salario = candidatoExistente[0].id_salario;
      this.todosDatosCandidato.candidato.salario = candidatoExistente[0].salario;//verificar
      this.todosDatosCandidato.candidato.id_rh_fuente_reclutamiento = candidatoExistente[0].id_rh_fuente_reclutamiento;
      this.todosDatosCandidato.candidato.tarjeta = candidatoExistente[0].tarjeta;
      this.todosDatosCandidato.candidato.id_Entidad = candidatoExistente[0].id_rh_entidad;//verificar
      this.todosDatosCandidato.candidato.id_participacion_anterior = candidatoExistente[0].id_participacion_anterior;
      this.todosDatosCandidato.candidato.id_trajo_hoja_vida = candidatoExistente[0].id_trajo_hoja_vida;
      this.todosDatosCandidato.candidato.id_disponibilidad_viaje = candidatoExistente[0].id_disponibilidad_viaje;
      this.todosDatosCandidato.candidato.runt = candidatoExistente[0].runt;
      this.todosDatosCandidato.candidato.idRhEps = candidatoExistente[0].id_rh_eps;
      this.todosDatosCandidato.candidato.idRhFondoPension = candidatoExistente[0].id_rh_fondo_pension;
      this.todosDatosCandidato.candidato.idRhFondoCaja = candidatoExistente[0].id_rh_fondo_caja;
      this.todosDatosCandidato.candidato.idRhFondoCesantias = candidatoExistente[0].id_rh_fondo_cesantias;
      this.todosDatosCandidato.candidato.licencia = candidatoExistente[0].licencia;
      this.todosDatosCandidato.candidato.tipo_licencia = candidatoExistente[0].tipo_licencia;
      this.todosDatosCandidato.candidato.fecha_vence_licencia = candidatoExistente[0].fecha_vence_licencia;
      this.todosDatosCandidato.candidato.id_rh_categoria = candidatoExistente[0].id_rh_categoria;
      this.todosDatosCandidato.candidato.id_rh_color_piel = candidatoExistente[0].id_rh_color_piel;
      this.todosDatosCandidato.candidato.id_rh_grupo_sanguineo = candidatoExistente[0].id_rh_grupo_sanguineo;
      this.todosDatosCandidato.candidato.rh = candidatoExistente[0].rh;
      this.todosDatosCandidato.candidato.peso = candidatoExistente[0].peso;
      this.todosDatosCandidato.candidato.altura = candidatoExistente[0].altura;
      // Fin Datos adicionales


      // Licencias
      const getCategoriasLic = await this.getAnyInformation('/hojadevida/categorias/' + this.candidatoId);

      const newArrayLicencias = getCategoriasLic.map((obj: {id: number; id_rh_candidato: number;  id_rh_categoria: number; categoria: string, fecha_vencimiento: Date;}) => ({
        id: obj.id,
        idCandidato: obj.id_rh_candidato,
        idCategoria: obj.id_rh_categoria,
        fechaVence: obj.fecha_vencimiento,
        accion: 0
      }));

      this.licenceArray = [...newArrayLicencias];
      this.todosDatosCandidato.categorias = [...newArrayLicencias];
      // this.storaged.set('datosLicencia', this.licenceArray);
      // Fin Licencias

    // datos estudios
    // this.candidatoId = candidatoExistente[0].id
    console.log(this.candidatoId);
    const getEstudios = await this.getAnyInformation('/hojadevida/estudios/' + this.candidatoId);
    console.log('estudios', getEstudios);
    const newArrayEstudio = getEstudios.map((obj: {
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

    this.studiesArray = [...newArrayEstudio];
    this.todosDatosCandidato.estudios = [...newArrayEstudio];
    // this.storaged.set('datosEstudiosStorage', this.studiesArray);
    console.log("Array estudios",this.studiesArray);
    // fin datos estudios

    // Referencias
    const getReferencias = await this.getAnyInformation('/hojadevida/referencias/' + this.candidatoId);

      const newArrayReference = getReferencias.map((obj: {
        id: number;
        cargo: string;
        celular: string;
        empresa: string;
        id_rh_candidato: number;
        mail: string;
        motivo_retiro: string;
        nombre: string;
        observaciones: string;
        observaciones_det: string;
        telefono: string;
        tiempo_laborado: string;
        tipo: number;
        tipo_ref: string;
      }) => ({

        id: obj.id,
        idCandidato: obj.id_rh_candidato,
        nombre: obj.nombre,
        celular: obj.celular,
        telefono: obj.telefono,
        mail: obj.mail,
        tipo: obj.tipo,
        idUsuario: 0,
        empresa: obj.empresa,
        Cargo: obj.cargo,
        Observaciones: obj.observaciones,
        TiempoLaborado: obj.tiempo_laborado,
        MotivoRetiro: obj.motivo_retiro,
        accion: 0,
      }));

      this.referenceArray = [...newArrayReference];
      this.todosDatosCandidato.referencias = [...newArrayReference];
      // this.storaged.set('datosReferenciasStorage', this.referenceArray);
    // Fin Referencias

    // Cargos
    const getCargos = await this.getAnyInformation('/hojadevida/candidatoPerfiles/' + this.candidatoId);
      console.log("Cargos en  perfiles con id", getCargos);
      const newArr = getCargos.map((item: { id_rh_perfil: any; }) => item.id_rh_perfil);
      this.idPerfilPrevio = [...newArr];
      console.log("Id Previo", this.idPerfilPrevio);
      this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
        ...this.otrosCargos, idPerfil
      }));


      console.log("cargos despues de previo ", this.cargosArray);
      this.todosDatosCandidato.cargos = [...this.cargosArray];
      // this.storaged.set('otrosCargosStorage', this.cargosArray);
    // Fin cargos

    // Info Familiar

    const getInfoFamiliar = await this.getAnyInformation('/hojadevida/familiares/' + this.candidatoId);

        const newArrayFamiliar = getInfoFamiliar.map((obj: {
          fecha_nacimiento: Date;
          id: number;
          id_rh_candidato: number;
          id_rh_parentesco: number | null;
          nit: string;
          nombre: string;
          parentesco: string;
          tel_residencia: string;

        }) => ({
          id: obj.id,
          id_candidato: obj.id_rh_candidato,
          nombre: obj.nombre,
          idParentesco: obj.id_rh_parentesco,
          edad: 0,
          ne: 0,
          ec: 0,
          ocupacion: '',
          empresa: '',
          telResidencia: obj.tel_residencia,
          otroFamiliar: 0,
          accion: 0,
          nit: obj.nit,
          fechaNace: obj.fecha_nacimiento,

        }));

        this.familyArray = [...newArrayFamiliar];
        this.todosDatosCandidato.referencias_familiares = [...newArrayFamiliar]
        // this.storaged.set('datosInfoFamilia', this.familyArray);
    // Fin Info Familiar
    console.log('Idiomas en ngModel', this.idIdiPrevio)
    console.log('idiomas como llego desde BD al consultar', getIdioB);

      this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
      // this.storaged.set('datosCandidatoStorage', this.datosCandidato);
      // this.storaged.set('idiomasStorage', this.idiomasArray);
      console.log("Prueba 1 todos los datos ",this.todosDatosCandidato);
      } else{
          setTimeout(
            () => {
              this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
            }, 1000);
    }


  } else{
    setTimeout(
          () => {
            this.todosDatosCandidato;
            console.log('objeto si no hay candidato', this.todosDatosCandidato);
            this.messageService.info("Atención...", "Debe digitar un número de documento para realizar la consulta");
          }, 1000);
  }

  }

  public async selectsValidate(selectContent:any, text: string, arrayData:any){
    if(selectContent === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar ' + text);
      return;
     }
     //
  }

public validateChanged(event:any){

}


  public async onSelectionChangePais(idPais:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;

    const deptos = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    if(deptos === null){
          this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
    }else{


      this.deptos = _.orderBy(deptos, ['id'], ['asc']);

      loading.close();
    }

  }
  public async onSelectionChangePaisExp(idPais:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;

    const deptosExp = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    if(deptosExp === null){
          this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
    }else{


      this.deptosExp = _.orderBy(deptosExp, ['id'], ['asc']);

      loading.close();
    }

  }
  public async onSelectionChangeDeptoExp(idDepto:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;

    const ciudadesExp = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
     if(ciudadesExp.length === 0){
      this.messageService.error('Error', 'Error interno del servidor al cargar las ciudadesExp');
      return;
    }

    this.ciudadesExp = _.orderBy(ciudadesExp, ['id'], ['asc']);

    loading.close();
  }

  public async onSelectionChangeDepto(idDepto:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;

    const ciudades = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
     if(ciudades.length === 0){
      this.messageService.error('Error', 'Error interno del servidor al cargar las ciudades');
      return;
    }

    this.ciudades = _.orderBy(ciudades, ['id'], ['asc']);

    loading.close();
  }
  public async onSelectionChangeCiudad(idCiudad:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;

    const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
     if(barrios === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los barrios');
      return;
    }else{

      this.barrios = _.orderBy(barrios, ['id'], ['asc']);

      loading.close();
    }

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



 public onChange(event:any){

    this.changeSelect.emit({'data':event});
  }

  ngOnDestroy() {
        // this.storaged.set('datosCandidatoStorage', this.datosCandidato);
        // const idiomasTotal = this.compararArrays(this.lenguas, this.idIdiPrevio);
        const originals = this.storaged.get('idiomasOriginales');

       const newIdiomas = this.compararArreglos(originals, this.idIdiPrevio);

        // console.log('prueba de función en New Idiomas', newIdiomas);
        // this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
        //   ...this.idiomasCandidato, idIdi
        // }));
        // console.log("idiomas", this.idiomasArray);

        // this.todosDatosCandidato.idiomas = idiomasTotal
        this.todosDatosCandidato.idiomas = [...newIdiomas]
      // this.storaged.set('idiomasStorage', this.idiomasArray);

      this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
  }


// public compararArrays(lenguas: any[], idIdiPrevio: number[]): any[] {
//   this.newIdiomas = [];
//   for (let i = 0; i < this.lenguas.length; i++) {
//     if (this.idIdiPrevio.indexOf(this.lenguas[i].id) !== -1) {
//       this.newIdiomas.push({
//         id: 0,
//         idIdi: this.lenguas[i].id,
//         idCandidato: 0,
//         idUsuario: 0,
//         accion: 0
//       });
//     } else {
//       this.newIdiomas.push({
//         id: 0,
//         idIdi: this.lenguas[i].id,
//         idCandidato: 0,
//         idUsuario: 0,
//         accion: 1
//       });
//     }
//   }

// console.log('Nuevo idiomas', this.newIdiomas);
//   this.lenguas
//   console.log('idioma previo ',this.idIdiPrevio);

//   return this.newIdiomas;
// }

public compararArreglos(originals: Idioma[], idioPrevio: number[]): Idioma[] {
  const filterLanguajes: Idioma[] = [];

  // Copiar objetos del array a al array c y marcar como eliminados si no están en el array b
  for (const itemA of originals) {
    const newItem: Idioma = { ...itemA };
    if (!idioPrevio.includes(itemA.idIdi)) {
      newItem.accion = 1;
    }
    filterLanguajes.push(newItem);
  }

  // Agregar nuevos objetos a partir del array b
  for (const itemB of idioPrevio) {
    const foundItem = originals.find(item => item.idIdi === itemB);

    if (!foundItem) {
      const newItem: Idioma = {
        id: 0,
        idIdi: itemB,
        idCandidato: 0,
        idUsuario: 0,
        accion: 0,
      };
      filterLanguajes.push(newItem);
    }
  }

  return filterLanguajes;
}

  public guardarProgreso(){

    if(!this.fieldDatosBasicos.valid){

      this.messageService.error('Error','Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.');
      this.fieldDatosBasicos.control.markAllAsTouched();
    }else{

// const idiomasTotal = this.compararArrays(this.lenguas, this.idIdiPrevio);

      // this.todosDatosCandidato.idiomas = idiomasTotal;
      this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
        ...this.idiomasCandidato, idIdi
      }));

      this.todosDatosCandidato.idiomas = [...this.idiomasArray]

      // this.storaged.set('datosCandidatoStorage', this.datosCandidato);
      // this.storaged.set('idiomasStorage', this.idiomasArray);

      this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);

      this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');

      this.disabledButtonNext = false;
    }

  }

  onInputBlur() {
    console.log('Input field blurred');
  }
}

