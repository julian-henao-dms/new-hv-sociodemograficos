import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Candidato } from "./interfaces/candidato.interface"


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
  value: string;
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
@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.scss']
})
export class DatosBasicosFormComponent implements OnInit {
  public depto: string = '';
  public ciudad: string = '';
  public barrio: string = '';
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
    {value: '0', viewValue: 'Personal Táctico y Soporte'},
    {value: '1', viewValue: 'Personal Operativo'},

  ];



  tiposDoc: Doc[] = [
    {value: '0', viewValue: 'Cédula  (CC)'},
    {value: '1', viewValue: 'Tarjeta de Identidad (TI)'},
    {value: '2', viewValue: 'Cédula Extranjería (CE)'},
    {value: '3', viewValue: 'Permisos Especiales de Permanencia'},
    {value: '4', viewValue: 'Otros'}
  ];
  paises: Pais[] = [
    {value: '0', viewValue: 'Argentina'},
    {value: '1', viewValue: 'Bolivia'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Colombia'},
    {value: '4', viewValue: 'Ecuador'},
    {value: '5', viewValue: 'Perú'}
  ];
  deptos: Depto[] = [
    {value: '0', viewValue: 'Antioquia'},
    {value: '1', viewValue: 'Cundinamarca'},
    {value: '2', viewValue: 'Nariño'},
    {value: '3', viewValue: 'Valle del Cauca'},
    {value: '4', viewValue: 'Quindío'},
    {value: '5', viewValue: 'Risaralda'}
  ];
  ciudades: Ciudad[] = [
    {value: '0', viewValue: 'Buenos Aires'},
    {value: '1', viewValue: 'La Paz'},
    {value: '2', viewValue: 'Brasil'},
    {value: '3', viewValue: 'Bogotá'},
    {value: '4', viewValue: 'Medellín'},
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
    {value: '0', viewValue: 'Inglés'},
    {value: '1', viewValue: 'Frances'}
  ];
  estados: EstadoCivil[] = [
    {value: '0', viewValue: 'Soltero'},
    {value: '1', viewValue: 'Unión Libre'}
  ];
  cargos: Cargo[] = [
    {value: '0', viewValue: 'Soltero'},
    {value: '1', viewValue: 'Unión Libre'}
  ];
  aniosExp: AniosExperiencia[] = [
    {value: '0', viewValue: 'Inglés'},
    {value: '1', viewValue: 'Frances'}
  ];
  public typeCandidato: number = 0;
  public txtnombre:string="";

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {
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
  }

@Output() changeSelect = new EventEmitter<any>();

 public onChange(event:any){
    console.log("Evento", event);
    this.changeSelect.emit({'data':event});
  }
}
