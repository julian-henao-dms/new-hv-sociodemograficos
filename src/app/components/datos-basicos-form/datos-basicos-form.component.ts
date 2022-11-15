import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Candidato, Idioma } from "./interfaces/candidato.interface";
import * as _ from 'lodash';
import { MatStepper } from '@angular/material/stepper';


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
  emp: number;
  id_usuario: number;
  id_tipo_candidato: number | null;
  id_rh_tipo_documento: number | null;//*
  nit: string;  //*
  fecExpedicion: string;//*
  lugarExpedicion: string;//*
  idCotClientePais: number | null;//
  nombre: string;//*
  apellido: string;//*
  genero: number | null;//*
  fecha_nacimiento: string;//*
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

  public typeCandidato: number = 0;

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
  emp: 0,
  id_usuario: 0,
  id_tipo_candidato: null,
  id_rh_tipo_documento: null,//*
  nit: '',   //*
  fecExpedicion: '', //*
  lugarExpedicion: '', //*
  idCotClientePais: null,//
  nombre: '', //*
  apellido: '', //*
  genero: null,//*
  fecha_nacimiento: '', //*
  idRhEstadoCivil: null,//*
  telefono: '', //*
  mail: '', //*
  celular: '', //*
  direccion: '', //*
  id_cot_cliente_pais: null,//*
  id_cot_cliente_barrio: null,//*
  id_rh_experiencia: null,//*
  id_rh_nivel_academico: null,//*
  id_rh_perfil: null,// cargo?
  pais: null,
  paisExp: null,
  depto: null,
  deptoExp: null,
}


public paisExpedicion = 0;
public depto = 0;
public ciudad = 0;


public idIdiPrevio: number[] = [];
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
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    // correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/ // 7 a 14 numeros.
  }


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
    console.log('regla tipo doc',tipoDocumento)
    if(tipoDocumento === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los tipos de documento');
         return;
        }
      console.log('ordenados',  _.orderBy(tipoDocumento, ['id'], ['asc']));
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

  // private async updateInformation(service: string, document: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //      this.apiService.updateInformacion(service, document).subscribe({
  //       next: (v) => resolve(v),
  //       error: (e) => {
  //         console.info(e);
  //         resolve(0);
  //       }
  //     });
  //   });
  // }

  public search(){
    console.log('Buscando');

  }

  public async selectsValidate(selectContent:any, text: string, arrayData:any){
    if(selectContent === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar ' + text);
      return;
     }
     //
  }

public validateChanged(event:any){
  console.log(event.value);
}

  public async onSelectionChangePais(idPais:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idPais);
    const deptos = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    if(deptos === null){
          this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
    }else{
      console.log('deptos', deptos);

      this.deptos = _.orderBy(deptos, ['id'], ['asc']);
      console.log('datos select deptos', this.deptos);
      loading.close();
    }

  }
  public async onSelectionChangePaisExp(idPais:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idPais);
    const deptosExp = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    if(deptosExp === null){
          this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
    }else{
      console.log('deptos', deptosExp);

      this.deptosExp = _.orderBy(deptosExp, ['id'], ['asc']);
      console.log('datos select deptosExp', this.deptosExp);
      loading.close();
    }

  }
  public async onSelectionChangeDeptoExp(idDepto:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idDepto);
    const ciudadesExp = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
     if(ciudadesExp.length === 0){
      this.messageService.error('Error', 'Error interno del servidor al cargar las ciudadesExp');
      return;
    }
    console.log('deptos', ciudadesExp);
    this.ciudadesExp = _.orderBy(ciudadesExp, ['id'], ['asc']);
    console.log('datos select deptos', this.ciudadesExp);
    loading.close();
  }

  public async onSelectionChangeDepto(idDepto:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idDepto);
    const ciudades = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
     if(ciudades.length === 0){
      this.messageService.error('Error', 'Error interno del servidor al cargar las ciudades');
      return;
    }
    console.log('deptos', ciudades);
    this.ciudades = _.orderBy(ciudades, ['id'], ['asc']);
    console.log('datos select deptos', this.ciudades);
    loading.close();
  }
  public async onSelectionChangeCiudad(idCiudad:number | null): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idCiudad);
    const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
     if(barrios === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los barrios');
      return;
    }else{
      console.log('deptos', barrios);
      this.barrios = _.orderBy(barrios, ['id'], ['asc']);
      console.log('datos select deptos', this.barrios);
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
    console.log("Evento", event);
    this.changeSelect.emit({'data':event});
  }




public validarFormulario(e:any){
  console.log('target name', e.target.name);
}

  public guardarProgreso(){
    console.log('Datos Básicos Guardados', this.datosCandidato);
    if(!this.fieldDatosBasicos.valid){
      console.log('No valido');
      this.messageService.error('Error','Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.');
      this.fieldDatosBasicos.control.markAllAsTouched();
    }else{
      console.log('valido');
      this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
        ...this.idiomasCandidato, idIdi
      }));
      console.log('Datos Idiomas', this.idiomasArray);
      this.storaged.set('datosCandidatoStorage', this.datosCandidato);
      this.storaged.set('idiomasStorage', this.idiomasArray);
      this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
      console.log('step', this.stepper);
      this.disabledButtonNext = false;
    }

  }
  public getSessionStorage(){
    // this.idiomasArray = this.storaged.get('idiomasStorage');
    // this.datosCandidato = this.storaged.get('datosCandidatoStorage');
    // this.datosBasicos = this.storaged.get('datosBasicosStorage');

  }

}

