import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Candidato, Idioma } from "./interfaces/candidato.interface"


interface TipoCandidato{
  value: string;
  viewValue: string;
}
interface Doc{
  value: string;
  viewValue: string;
}
interface Pais{
  value: string;
  viewValue: string;
}
interface Depto{
  value: string;
  viewValue: string;
}
interface Ciudad{
  value: string;
  viewValue: string;
}
interface Barrio{
  value: string;
  viewValue: string;
}
interface NivelAcademico{
  value: string;
  viewValue: string;
}
interface LenguajeExtranjera{
  value: number;
  viewValue: string;
}
interface EstadoCivil{
  value: string;
  viewValue: string;
}
interface Cargo{
  value: string;
  viewValue: string;
}
interface AniosExperiencia{
  value: string;
  viewValue: string;
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

  // public depto: string = '';
  // public ciudad: string = '';
  // public barrio: string = '';
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

public disabledButtonNext: boolean = true;
public idiomasCandidato: Idioma = {
  idIdi: 0,
  idCandidato: 0,
  idUsuario: 0,
  id: 0,
  accion: 0,
}

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
    {value: '0', viewValue: 'Personal T??ctico y Soporte'},
    {value: '1', viewValue: 'Personal Operativo'},

  ];

  tiposDoc: Doc[] = [
    {value: '0', viewValue: 'C??dula  (CC)'},
    {value: '1', viewValue: 'Tarjeta de Identidad (TI)'},
    {value: '2', viewValue: 'C??dula Extranjer??a (CE)'},
    {value: '3', viewValue: 'Permisos Especiales de Permanencia'},
    {value: '4', viewValue: 'Otros'}
  ];
  paises: Pais[] = [
    {value: '0', viewValue: 'Argentina'},
    {value: '1', viewValue: 'Bolivia'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Colombia'},
    {value: '4', viewValue: 'Ecuador'},
    {value: '5', viewValue: 'Per??'}
  ];
  deptos: Depto[] = [
    {value: '0', viewValue: 'Antioquia'},
    {value: '1', viewValue: 'Cundinamarca'},
    {value: '2', viewValue: 'Nari??o'},
    {value: '3', viewValue: 'Valle del Cauca'},
    {value: '4', viewValue: 'Quind??o'},
    {value: '5', viewValue: 'Risaralda'}
  ];
  ciudades: Ciudad[] = [
    {value: '0', viewValue: 'Buenos Aires'},
    {value: '1', viewValue: 'La Paz'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Bogot??'},
    {value: '4', viewValue: 'Medell??n'},
    {value: '5', viewValue: 'Quito'}
  ];
  barrios: Barrio[] = [
    {value: '0', viewValue: 'Buenos Aires'},
    {value: '1', viewValue: 'La Paz'},

  ];
  nivelesAcademia: NivelAcademico[] = [
    {value: '0', viewValue: 'Primaria'},
    {value: '1', viewValue: 'Bachiller'}

  ];
  lenguas: LenguajeExtranjera[] = [
    {value: 0, viewValue: 'Ingl??s'},
    {value: 1, viewValue: 'Frances'},
    {value: 2, viewValue: 'Frances'}
  ];
  estados: EstadoCivil[] = [
    {value: '0', viewValue: 'Soltero'},
    {value: '1', viewValue: 'Uni??n Libre'}
  ];
  cargos: Cargo[] = [
    {value: '0', viewValue: 'Director Inform??tica'},
    {value: '1', viewValue: 'Consultor'}
  ];
  aniosExp: AniosExperiencia[] = [
    {value: '0', viewValue: '1 A??o a 2 A??os'},
    {value: '1', viewValue: '3 A??o a 5 A??os'}
  ];
  public typeCandidato: number = 0;
  public txtnombre:string="";

  constructor(private _storaged: LocalStorageService, private breakpointObserver: BreakpointObserver) {
    this.getLocalStorage();


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

  ngOnInit(): void {
    // this.getLocalStorage();
  }



 public onChange(event:any){
    console.log("Evento", event);
    this.changeSelect.emit({'data':event});
  }

  public guardarProgreso(){
    console.log('Datos B??sicos Guardados', this.datosBasicos);
    console.log('Datos Idiomas', this.idiomasCandidato);
    this._storaged.set('datosBasicosStorage', this.datosBasicos);
    // localStorage.setItem('datosBasicosStorage', JSON.stringify(this.datosBasicos) );
    this.disabledButtonNext = false;
  }
  public getLocalStorage(){
    console.log('Cargar Datos B??sicos', this.datosBasicos);
    this.datosBasicos = this._storaged.get('datosBasicosStorage');
    // this.datosBasicos = JSON.parse(localStorage.getItem('datosBasicosStorage')! );
  }

}
