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
  public  aniosExp: AniosExperiencia[] = [];
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
}

public datosBasicos: Candidato = {
   emp:  0,
   nit: '',
   id_rh_tipo_documento:  0,
   nombre: '',
   apellido: '',
   id_usuario:  0,
   genero:  0,
   fecha_nacimiento: new Date,
   id_cot_cliente_pais:  0,
   direccion: '',
   telefono: '',
   celular: '',
   mail: '',
   id_rh_perfil:  0,
   id_cot_cliente:  0,
   id_rh_requisicion_personal:  0,
   id_rh_nivel_academico:  0,
   id_rh_experiencia:  0,
   observaciones: '',
   id_tipo_candidato:  0,
   id_rh_experiencia_sector:  0,
   id_disponibilidad_viaje:  0,
   id_participacion_anterior:  0,
   id_salario:  0,
   id_rh_fuente_reclutamiento:  0,
   id_trajo_hoja_vida:  0,
   estado:  0,
   bloqueado:  0,
   motivo: '',
   licencia: '',
   tarjeta: '',
   tipo_licencia:  0,
   fecha_vence_licencia: '',
   runt:  0,
   id_rh_categoria:  0,
   id_rh_color_piel:  0,
   id_rh_grupo_sanguineo:  0,
   rh:  0,
   id_rh_experiencia_equipo:  0,
   peso:  0,
   altura:  0,
   salario:  0,
   id:  0,
   accion:  0,
   id_Usuario_Asociado:  0,
   id_con_cco:  0,
   id_Entidad:  0,
   fecExpedicion: new Date,
   lugarExpedicion: '',
   idRhEstadoCivil:  0,
   idRhEps:  0,
   idRhFondoPension:  0,
   idRhFondoCaja:  0,
   idRhFondoCesantias:  0,
   pais: 0,
   depto: 0,
   ciudad: 0,
   barrio: 0,
   cargoAplica: 0,
}
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

  tiposCandidato: TipoCandidato[] = [
    {id: 0, descripcion: 'Personal Táctico y Soporte'},
    {id: 1, descripcion: 'Personal Operativo'},

  ];




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
  //  if(paises.response.length > 0){
  //    this.messageService.error('Error', 'Error interno del servidor al cargar los paises');
  //    return;
  //   }
    console.log(paises.response);
    this.paises = paises.response;
    console.log(this.paises);
    console.log(this.datosBasicos.pais);


    const tipoDocumento = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'tipo_documento' + '/' + 'subcriterio');
    if(tipoDocumento === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los tipos de documento');
         return;
        }
    this.tiposDocumento = tipoDocumento;

    const estadoCivil = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'estado_civil' + '/' + 'subcriterio');
    if(estadoCivil === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de estado civil');
         return;
        }
    this.estados = estadoCivil;

    const experienciaEspecifica = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'experiencia' + '/' + 'subcriterio');
    if(experienciaEspecifica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de experiencia');
      return;
    }
    this.aniosExp = experienciaEspecifica;

    const nivelAcademico = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'academico' + '/' + 'subcriterio');
    if(nivelAcademico === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los niveles académicos');
      return;
    }
    this.nivelesAcademia = nivelAcademico;

    const cargoAplica = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'p' + '/' + 'perfil');
    if(cargoAplica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los perfiles');
      return;
    }else{
      this.cargos = cargoAplica;
    }


    const lenguaExtranjera = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'idioma' + '/' + 'subcriterio');
    if(lenguaExtranjera === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los idiomas');
      return;
    }
    this.lenguas = lenguaExtranjera;

    // await this.selectsValidate(paises);
    // await this.selectsValidate(tipoDocumento);
    // await this.selectsValidate(estadoCivil);
    // await this.selectsValidate(experienciaEspecifica);
    // await this.selectsValidate(nivelAcademico);
    // await this.selectsValidate(cargoAplica);
    // await this.selectsValidate(LenguaExtranjera);

        loading.close();

        //  const departamentos = await this.getAnyInformation('/pais/Departamentos' + '/' + this.datosBasicos.pais);
        //   console.log(departamentos.response);
        //   this.deptos = departamentos.response;
        //   console.log(this.deptos);
        // return new Promise((resolve, reject) => {

          // })

          // (await this.apiService.getInformacion('/pais/', this.param)).subscribe({
            //   next: (v) => {
              //     console.log(v.response);
              //   },
              //   error: (e) => {
                //     console.error(e);
                //   },
                //   complete: () => {
                  //     console.log('Se completó la consulta a la API');
                  //   }
                  // });
  }

  public async selectsValidate(selectContent:boolean){
    if(selectContent){
      this.messageService.error('Error', 'Error interno del servidor al cargar los cargos');
      return;
     }
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

      this.deptos = deptos.response;
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
      this.messageService.error('Error', 'Error interno del servidor al cargar los departamentos');
      return;
    }
    console.log('deptos', ciudades);
    this.ciudades = ciudades.response;
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
      this.barrios = barrios.response;
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



  public guardarProgreso(){
    console.log('Datos Básicos Guardados', this.datosBasicos);

    this.idiomasArray = this.idIdiPrevio.map(idIdi => ({
      ...this.idiomasCandidato, idIdi
    }));
    console.log('Datos Idiomas', this.idiomasArray);
    this.storaged.set('datosCandidatoStorage', this.datosCandidato);
    this.storaged.set('datosBasicosStorage', this.datosBasicos);
    this.storaged.set('idiomasStorage', this.idiomasArray);
    this.disabledButtonNext = false;
  }
  public getSessionStorage(){
    // this.idiomasArray = this.storaged.get('idiomasStorage');
    // this.datosCandidato = this.storaged.get('datosCandidatoStorage');
    // this.datosBasicos = this.storaged.get('datosBasicosStorage');

  }

}
