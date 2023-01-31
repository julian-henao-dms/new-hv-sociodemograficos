import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Candidato, Idioma } from "./interfaces/candidato.interface";
import * as _ from 'lodash';
import { MatStepper } from '@angular/material/stepper';
import { MatSelect } from '@angular/material/select';
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
  id: string;
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
interface DatosBasicosCandidato {
  id:number;
  emp: number;
  id_usuario: number;
  id_tipo_candidato: number | null;
  id_rh_tipo_documento: number | null;//*
  nit: string;  //*
  fecExpedicion: Date;//*
  lugarExpedicion: string;//*
  idCotClientePais: number | null;//
  nombre: string;//*
  apellido: string;//*
  genero: number | null;//*
  fecha_nacimiento: Date;//*
  idRhEstadoCivil: number | null;//*
  telefono: string;//*
  mail: string;//*
  celular: string;//*
  direccion: string;//*
  id_cot_cliente_pais: number | null;//*
  id_cot_cliente_barrio: number | null;//*
  id_rh_experiencia: number | null;//*
  id_rh_nivel_academico: number | null;//*
  id_rh_perfil: number | null;// cargo?
  depto:number | null;
  deptoExp:number | null;
  pais:number | null;
  paisExp:number | null;
  fuente:string;
}
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

public datosCandidato: DatosBasicosCandidato = {
  id:0,
  emp: 0,
  id_usuario: 0,
  id_tipo_candidato: null,
  id_rh_tipo_documento: null,
  nit: '',
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
  fuente: ''
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
    const datosBasicosStorage = this.storaged.get('datosCandidatoStorage');
    if(datosBasicosStorage > 0){
      this.datosCandidato = datosBasicosStorage;
    }

    const getIdiomas = this.storaged.get('idiomasStorage');
    if(getIdiomas > 0){
      console.log('idiomas storage', getIdiomas);
    const getIdio = getIdiomas.map((element: { idIdi: number; }) => element.idIdi)
    this.idIdiPrevio = [...getIdio];
    console.log('Idiomas mapeados desde storage', this.idIdiPrevio);
    }
   const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
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


  loading.close();
  }


  public ngOnChanges(){

  }

  public async search(): Promise<void>{

    this.storaged.clear();
    if(this.datosCandidato.nit !== ''){
      this.messageService.info("Atencion", "Estamos cargando los datos del candidato");
      const idEmp = this.idEmp;
      const candidatoExistente = await this.getAnyInformation('/hojadevida/candidato/0?identificacion=' + this.datosCandidato.nit);
      if(candidatoExistente  && candidatoExistente.length > 0){
        this.storaged.set('candidatoExistente', candidatoExistente);
        this.datosCandidato.id = candidatoExistente[0].id;
        this.datosCandidato.nit = candidatoExistente[0].nit;
        this.datosCandidato.id_rh_tipo_documento = candidatoExistente[0].id_rh_tipo_documento;
        this.datosCandidato.nombre = candidatoExistente[0].nombre;
        this.datosCandidato.apellido = candidatoExistente[0].apellido;
        this.datosCandidato.genero = candidatoExistente[0].genero;
        this.datosCandidato.fecha_nacimiento = candidatoExistente[0].fecha_nacimiento;
        // this.datosCandidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
        this.datosCandidato.direccion = candidatoExistente[0].direccion;
        this.datosCandidato.telefono = candidatoExistente[0].telefono;
        this.datosCandidato.celular = candidatoExistente[0].celular;
        this.datosCandidato.mail = candidatoExistente[0].mail;
        this.datosCandidato.id_rh_perfil = candidatoExistente[0].id_rh_perfil;
        this.datosCandidato.idCotClientePais = candidatoExistente[0].id_cot_cliente_pais2;
        this.datosCandidato.id_cot_cliente_pais = candidatoExistente[0].id_cot_cliente_pais;
        this.datosCandidato.id_rh_nivel_academico = candidatoExistente[0].id_rh_nivel_academico;
        this.datosCandidato.id_rh_experiencia = candidatoExistente[0].id_rh_experiencia;
        this.datosCandidato.id_tipo_candidato = candidatoExistente[0].id_tipo_candidato;
        this.datosCandidato.idRhEstadoCivil = candidatoExistente[0].id_rh_estado_civil;
        this.datosCandidato.fecExpedicion = candidatoExistente[0].fecha_exp_cedula;
        this.datosCandidato.lugarExpedicion = candidatoExistente[0].lugar_exp_cedula;
        const estadoCandidato = candidatoExistente[0].estado;
        if(estadoCandidato === 2){
          this.activeTab.emit(false);
        }
        this.todosLugares =  await this.getAnyInformation('/pais/all/' + this.idEmp);
console.log('Datos paises deptos y ciudad', this.todosLugares);
        this.candidatoId = candidatoExistente[0].id
        const getIdiomas = await this.getAnyInformation('/hojadevida/idiomas/' + this.candidatoId);
        const getIdio = getIdiomas.map((element: { id_rh_idioma: number; }) => element.id_rh_idioma)
        this.idIdiPrevio = [...getIdio];
        // if(candidatoExistente === 0 || candidatoExistente == null){
        //   setTimeout(
        //     () => {
        //       this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
        //     }, 1000);

        // } else{
        // this.candidatoId = candidatoExistente[0].id
        // const getIdiomas = await this.getAnyInformation('/hojadevida/idiomas/' + this.candidatoId);
        // const getIdio = getIdiomas.map((element: { id_rh_idioma: number; }) => element.id_rh_idioma)
        // this.idIdiPrevio = [...getIdio];
        // }



      const ciudadDeptoExp = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.datosCandidato.idCotClientePais);
      const ciudadDeptoUbiq = this.todosLugares.find((depto: { id: number | null; }) => depto.id === this.datosCandidato.id_cot_cliente_pais);

      const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais
      const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais

      const deptoPais = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudad);
      const deptoPaisExp = this.todosLugares.find((pais: { id: number | null; }) => pais.id === deptoCiudadExp);
      const paisCandidato = deptoPais.id_cot_cliente_pais;
      const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

      this.datosCandidato.paisExp = paisCandidatoExp;
      this.onSelectionChangePaisExp(paisCandidatoExp);
      this.datosCandidato.deptoExp = deptoCiudadExp;
      this.onSelectionChangeDeptoExp(deptoCiudadExp)
      this.datosCandidato.idCotClientePais = this.datosCandidato.idCotClientePais;

      this.datosCandidato.pais = paisCandidato;
      this.onSelectionChangePais(paisCandidato);
      this.datosCandidato.depto = deptoCiudad;
      this.onSelectionChangeDepto(deptoCiudad)
      this.datosCandidato.id_cot_cliente_pais = this.datosCandidato.id_cot_cliente_pais;
      this.onSelectionChangeCiudad(this.datosCandidato.id_cot_cliente_pais);
      this.datosCandidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
        // setTimeout(
        //   () => {
        //     this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
        //   }, 1000);
      } else{
          setTimeout(
            () => {
              this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
            }, 1000);
    }


  } else{
    setTimeout(
          () => {
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


public validarFormulario(e:any){

}

  public guardarProgreso(){

    if(!this.fieldDatosBasicos.valid){

      this.messageService.error('Error','Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.');
      this.fieldDatosBasicos.control.markAllAsTouched();
    }else{


      this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
        ...this.idiomasCandidato, idIdi
      }));

      this.storaged.set('datosCandidatoStorage', this.datosCandidato);
      this.storaged.set('idiomasStorage', this.idiomasArray);
      this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');

      this.disabledButtonNext = false;
    }

  }
}

