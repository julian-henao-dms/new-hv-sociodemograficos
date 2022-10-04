import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Candidato, Idioma } from "./interfaces/candidato.interface"


interface TipoCandidato{
  value: string;
  viewValue: string;
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
  id_tipo_candidato: number;
  nit: string;
  id_rh_tipo_documento: number;
  fecExpedicion: Date;
  lugar_expedicion_pais:number;
  lugar_expedicion_depto:number;
  lugar_expedicion_ciudad:number;
  nombre: string;
  apellido: string;
  id_usuario: number;
  genero: number;
  fecha_nacimiento: Date;
  idRhEstadoCivil: number;
  telefono: string;
  mail: string;
  celular: string;
  direccion: string;
  pais:number;
  depto:number;
  ciudad:number;
  barrio: number;
  id_rh_experiencia: number;
  id_rh_nivel_academico: number;
  cargo_aplica: number;
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
    {value: '0', viewValue: 'Personal Táctico y Soporte'},
    {value: '1', viewValue: 'Personal Operativo'},

  ];




  constructor(
    private _storaged: SessionStorageService,
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
    this.getLocalStorage();
  //  const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
   const idEmp = this.idEmp;
   const numRegla = this.numRegla


   const paises = await this.getAnyInformation('/pais/' + idEmp);
    console.log(paises.response);
    this.paises = paises.response;
    console.log(this.paises);
    console.log(this.datosBasicos.pais);

    const tipoDocumento = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'tipo_documento' + '/' + 'subcriterio');
    this.tiposDocumento = tipoDocumento;

    const estadoCivil = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'estado_civil' + '/' + 'subcriterio');
    this.estados = estadoCivil;

    const experienciaEspecifica = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'experiencia' + '/' + 'subcriterio');
    this.aniosExp = experienciaEspecifica;

    const nivelAcademico = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'academico' + '/' + 'subcriterio');
    this.nivelesAcademia = nivelAcademico;

    const cargoAplica = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'p' + '/' + 'perfil');
    this.cargos = cargoAplica;

    const LenguaExtranjera = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'idioma' + '/' + 'subcriterio');
    this.lenguas = LenguaExtranjera;

  //  if(paises){
  //   this.messageService.error('Error', 'Error interno del servidor al cargar los paises');
  //   return;
  //  }
  //  loading.close();

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

  public async onSelectionChangePais(idPais:number): Promise<void> {
    // const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idPais);
    const deptos = await this.getAnyInformation('/pais/departamentos/' + idEmp + '/' + idPais);
    console.log('deptos', deptos);
    this.deptos = deptos.response;
    console.log('datos select deptos', this.deptos);
  }
  public async onSelectionChangeDepto(idDepto:number): Promise<void> {
    // const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idDepto);
    const ciudades = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
    console.log('deptos', ciudades);
    this.ciudades = ciudades.response;
    console.log('datos select deptos', this.ciudades);
  }
  public async onSelectionChangeCiudad(idCiudad:number): Promise<void> {
    // const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    console.log('Datos pais', idEmp, idCiudad);
    const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
    console.log('deptos', barrios);
    this.barrios = barrios.response;
    console.log('datos select deptos', this.barrios);
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
    // this._storaged.set('datosBasicosStorage', this.datosBasicos);
    // this._storaged.set('idiomasStorage', this.idiomasArray);
    // localStorage.setItem('datosBasicosStorage', JSON.stringify(this.datosBasicos) );
    this.disabledButtonNext = false;
  }
  public getLocalStorage(){
    console.log('Cargar Datos Básicos', this.datosBasicos);
    // this.datosBasicos = this._storaged.get('datosBasicosStorage');
    // this.idiomasArray = this._storaged.get('idiomasStorage');
    // this.datosBasicos = JSON.parse(localStorage.getItem('datosBasicosStorage')! );
  }

}
