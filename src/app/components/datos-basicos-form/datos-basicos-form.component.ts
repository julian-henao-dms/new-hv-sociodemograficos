import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Candidato, Idioma } from "./interfaces/candidato.interface"


interface TipoCandidato{
  id: number;
  descripcion: string;
}
interface TipoDocumento{
  id: string;
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
  id_tipo_candidato: number;
  id_rh_tipo_documento: number;//*
  nit: string;  //*
  fecExpedicion: string;//*
  lugarExpedicion: string;//*
  idCotClientePais: number;//
  nombre: string;//*
  apellido: string;//*
  genero: number;//*
  fecha_nacimiento: string;//*
  idRhEstadoCivil: number;//*
  telefono: string;//*
  mail: string;//*
  celular: string;//*
  direccion: string;//*
  id_cot_cliente_pais: number;//*
  id_cot_cliente_barrio: number;//*
  id_rh_experiencia: number;//*
  id_rh_nivel_academico: number;//*
  id_rh_perfil: number;// cargo?
  depto:number;
  pais:number;
}
@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.scss']
})
export class DatosBasicosFormComponent implements OnInit {

  @Output() changeSelect = new EventEmitter<any>();

  public typeCandidato: number = 0;

  public idEmp: number = 3;
  public numRegla: number = 159;
  public paises: Pais[] = [];
  public deptos: Depto[] = [];
  public tiposDocumento: TipoDocumento[] = [];
  public estados: EstadoCivil[] = [];
  public aniosExp: AniosExperiencia[] = [];
  public nivelesAcademia: NivelAcademico[] = [];
  public cargos: Cargo[] = [];
  public lenguas: LenguajeExtranjera[] = [];
  ciudades: Ciudad[] = [];
  barrios: Barrio[] = [];

public datosCandidato: DatosBasicosCandidato = {
  emp: 0,
  id_usuario: 0,
  id_tipo_candidato: -1,
  id_rh_tipo_documento: 0,//*
  nit: '',   //*
  fecExpedicion: '', //*
  lugarExpedicion: '', //*
  idCotClientePais: 0,//
  nombre: '', //*
  apellido: '', //*
  genero: 0,//*
  fecha_nacimiento: '', //*
  idRhEstadoCivil: 0,//*
  telefono: '', //*
  mail: '', //*
  celular: '', //*
  direccion: '', //*
  id_cot_cliente_pais: 0,//*
  id_cot_cliente_barrio: 0,//*
  id_rh_experiencia: 0,//*
  id_rh_nivel_academico: 0,//*
  id_rh_perfil: 0,// cargo?
  pais: 0,
  depto: 0,
}

public depto = 0;
public ciudad = 0;


public idIdiPrevio: number[] = [];
public idiomasArray: any[] = [];
public disabledButtonNext: boolean = true;

public idiomasCandidato: Idioma = {
    idIdi:0,
    idCandidato: 0,
    idUsuario: 0,
    id: 0,
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

  // public numbersText = "^[A-Za-z0-9_-]{1,20}$"
  // public numbersText2 = "^[A-Za-z0-9_-]{8,20}$"


  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    nums: /^\d{7,15}$/ // 7 a 14 numeros.
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

  async ngOnInit(): Promise<void> {

   const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
   const idEmp = this.idEmp;
   const numRegla = this.numRegla


   const paises = await this.getAnyInformation('/pais/' + idEmp);
   if(paises === null){
     this.messageService.error('Error', 'Error interno del servidor al cargar los paises');
     return;
    }
    this.paises = paises;

    const tipoDocumento = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'tipo_documento');
    console.log('regla tipo doc',tipoDocumento)
    if(tipoDocumento === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los tipos de documento');
         return;
        }
    this.tiposDocumento = tipoDocumento;

    const estadoCivil = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'estado_civil');
    if(estadoCivil === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de estado civil');
         return;
        }
    this.estados = estadoCivil;

    const experienciaEspecifica = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'experiencia');
    if(experienciaEspecifica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de experiencia');
      return;
    }
    this.aniosExp = experienciaEspecifica;

    const nivelAcademico = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'academico');
    if(nivelAcademico === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los niveles académicos');
      return;
    }
    this.nivelesAcademia = nivelAcademico;


    const lenguaExtranjera = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'idioma');
    if(lenguaExtranjera === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los idiomas');
      return;
    }
    this.lenguas = lenguaExtranjera;

    const cargoAplica = await this.getAnyInformation('/hojadevida/perfiles/' + idEmp);
    if(cargoAplica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los perfiles');
      return;
    }
    this.cargos = cargoAplica;

    loading.close();
  }

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



  public async onSelectionChangePais(idPais:number): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idPais);
    const deptos = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    if(deptos === null){
      setTimeout(
        () => {
          this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
        }, 1000);
    }else{
      console.log('deptos', deptos);
      //   this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
      //   return;
      // }

      this.deptos = deptos;
      console.log('datos select deptos', this.deptos);
      loading.close();
    }

  }
  public async onSelectionChangeDepto(idDepto:number): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idDepto);
    const ciudades = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
     if(ciudades.length === 0){
      this.messageService.error('Error', 'Error interno del servidor al cargar las ciudades');
      return;
    }
    console.log('deptos', ciudades);
    this.ciudades = ciudades;
    console.log('datos select deptos', this.ciudades);
    loading.close();
  }
  public async onSelectionChangeCiudad(idCiudad:number): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idCiudad);
    const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
     if(barrios === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los barrios');
      return;
    }else{
      console.log('deptos', barrios);
      this.barrios = barrios;
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


 public onChange(event:any){
    console.log("Evento", event);
    this.changeSelect.emit({'data':event});
  }

  public validarCampos(): boolean{
    let that = this;
    let valid = true;
    // let inputsHdv = document.getElementsByClassName('input-hdv');
    // console.log('ìnputs validete', inputsHdv);

    // let elements = document.getElementsByClassName('input-hdv');
    // console.log('Elements', elements);
    // Array.prototype.map.call(elements, function(element){
    //   console.log('value Element', element.value);
    //   console.log('name Element', element.name);
    //   if(!element.value || element.value === ''){
    //     element.focus();
    //     that.messageService.warning('Oops...', 'Debe llenar el campo "' + element.name + '" para continuar');
    //     valid = false;
    //   }
    // });
//     for (let i = 0; i < inputsHdv.length; i++){
//       const itemName = inputsHdv[i].getAttribute('name');
//       const itemValue = inputsHdv[i].getAttribute('value');
//       console.log('items', itemValue);
//       // console.log('tipo', typeof(itemValue));
//         let element = document.getElementsByName(itemValue!)[0];
//         // console.log('element', element);
// //

//         console.log('elementValue', element);
//         element.focus();
//         this.messageService.warning('Oops...', 'Debe llenar el campo "' + itemValue + '" para continuar');
//         valid = false;
//       }

    return valid;
  }

public validarFormulario(e:any){
  console.log('target name', e.target.name);
}

  public guardarProgreso(){
    this.validarCampos();
    console.log('Datos Básicos Guardados', this.datosCandidato);

    this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
      ...this.idiomasCandidato, idIdi
    }));
    console.log('Datos Idiomas', this.idiomasArray);
    this.storaged.set('datosCandidatoStorage', this.datosCandidato);
    // this.storaged.set('datosBasicosStorage', this.datosBasicos);
    this.storaged.set('idiomasStorage', this.idiomasArray);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;
  }
  public getSessionStorage(){
    // this.idiomasArray = this.storaged.get('idiomasStorage');
    // this.datosCandidato = this.storaged.get('datosCandidatoStorage');
    // this.datosBasicos = this.storaged.get('datosBasicosStorage');

  }

}
// function typeOf(itemValue: string | null): any {
//   throw new Error('Function not implemented.');
// }

