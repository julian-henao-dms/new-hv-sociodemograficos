import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// interface TipoCandidato{
//   value: number;
//   viewValue: string;
// }
// interface Doc{
//   value: number;
//   viewValue: string;
// }
// interface Pais{
//   value: number;
//   viewValue: string;
// }
// interface Depto{
//   value: number;
//   viewValue: string;
// }
// interface Ciudad{
//   value: number;
//   viewValue: string;
// }
// interface Barrio{
//   value: number;
//   viewValue: string;
// }
// interface NivelAcademico{
//   value: number;
//   viewValue: string;
// }
// interface LenguajeExtranjera{
//   value: number;
//   viewValue: string;
// }
// interface EstadoCivil{
//   value: number;
//   viewValue: string;
// }
// interface Cargo{
//   value: number;
//   viewValue: string;
// }
// interface AniosExperiencia{
//   value: number;
//   viewValue: string;
// }
// interface CategoriaLicencia{
//   value: number;
//   viewValue: string;
// }
// interface AspiracionSalarial{
//   value: number;
//   viewValue: string;
// }
// interface FuenteReclutamiento{
//   value: number;
//   viewValue: string;
// }
// interface EntidadExpedicion{
//   value: number;
//   viewValue: string;
// }
// interface EPS{
//   value: number;
//   viewValue: string;
// }
// interface FondoPension{
//   value: number;
//   viewValue: string;
// }
// interface CajaCompensacion{
//   value: number;
//   viewValue: string;
// }
// interface Cesantia{
//   value: number;
//   viewValue: string;
// }
// interface ColorPiel{
//   value: number;
//   viewValue: string;
// }


@Component({
  selector: 'app-hv-formulario',
  templateUrl: './hv-formulario.component.html',
  styleUrls: ['./hv-formulario.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class HvFormularioComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  public isDatosBasicos:number = 1;
  public isVisible = -1;
  // public tiposReferencia: string[] = ['Personal', 'Laboral'];
  public typeCandidato: number = 0;
  public operacionesDisabled = true;
  public isLinear = true;
  public isActive = true;
  // public txtnombre:string="";


  // tiposCandidato: TipoCandidato[] = [
  //   {value: 0, viewValue: 'Personal Táctico y Soporte'},
  //   {value: 1, viewValue: 'Personal Operativo'},

  // ];
  // tiposDoc: Doc[] = [
  //   {value: 0, viewValue: 'Cédula  (CC)'},
  //   {value: 1, viewValue: 'Tarjeta de Identidad (TI)'},
  //   {value: 2, viewValue: 'Cédula Extranjería (CE)'},
  //   {value: 3, viewValue: 'Permisos Especiales de Permanencia'},
  //   {value: 4, viewValue: 'Otros'}
  // ];
  // paises: Pais[] = [
  //   {value: 0, viewValue: 'Argentina'},
  //   {value: 1, viewValue: 'Bolivia'},
  //   {value: 2, viewValue: 'Brasil'},
  //   {value: 3, viewValue: 'Colombia'},
  //   {value: 4, viewValue: 'Ecuador'},
  //   {value: 5, viewValue: 'Perú'}
  // ];
  // deptos: Depto[] = [
  //   {value: 0, viewValue: 'Antioquia'},
  //   {value: 1, viewValue: 'Cundinamarca'},
  //   {value: 2, viewValue: 'Nariño'},
  //   {value: 3, viewValue: 'Valle del Cauca'},
  //   {value: 4, viewValue: 'Quindío'},
  //   {value: 5, viewValue: 'Risaralda'}
  // ];
  // ciudades: Ciudad[] = [
  //   {value: 0, viewValue: 'Buenos Aires'},
  //   {value: 1, viewValue: 'La Paz'},
  //   {value: 2, viewValue: 'Brasil'},
  //   {value: 3, viewValue: 'Bogotá'},
  //   {value: 4, viewValue: 'Medellín'},
  //   {value: 5, viewValue: 'Quito'}
  // ];
  // barrios: Barrio[] = [
  //   {value: 0, viewValue: 'Buenos Aires'},
  //   {value: 1, viewValue: 'La Paz'},

  // ];
  // nivelesAcademia: NivelAcademico[] = [
  //   {value: 0, viewValue: 'Primaria'},
  //   {value: 1, viewValue: 'Bachiller'}

  // ];
  // lenguas: LenguajeExtranjera[] = [
  //   {value: 0, viewValue: 'Inglés'},
  //   {value: 1, viewValue: 'Frances'}
  // ];
  // estados: EstadoCivil[] = [
  //   {value: 0, viewValue: 'Soltero'},
  //   {value: 1, viewValue: 'Unión Libre'}
  // ];
  // cargos: Cargo[] = [
  //   {value: 0, viewValue: 'Director'},
  //   {value: 1, viewValue: 'Ingeniero'}
  // ];
  // aniosExp: AniosExperiencia[] = [
  //   {value: 0, viewValue: '1 Año a 2 Años'},
  //   {value: 1, viewValue: '2 Años a 3 Años'}
  // ];
  // categorias: CategoriaLicencia[] = [
  //   {value: 0, viewValue: 'A1'},
  //   {value: 1, viewValue: 'B1'}
  // ];
  // salarios: AspiracionSalarial[] = [
  //   {value: 0, viewValue: '1.000.000$ - 1.500.000$'},
  //   {value: 1, viewValue: '1.500.000$ - 2.500.000$'}
  // ];
  // fuentesReclutamiento: FuenteReclutamiento[] = [
  //   {value: 0, viewValue: 'LinkedIn'},
  //   {value: 1, viewValue: 'Computrabajo'}
  // ];
  // entidades: EntidadExpedicion[] = [
  //   {value: 0, viewValue: 'CONSEJO PROFESIONAL NACIONAL DE TECNÓLOGOS EN ELECTRICIDAD, ELECTROMECÁNICA, ELECTRÓNICA Y AFINES- CONALTEL'},
  //   {value: 1, viewValue: 'CONSEJO NACIONAL DE INGENIERÍAS ELÉCTRICA, MECÁNICA Y PROFESIONES AFINES'}
  // ];
  // epss: EPS[] = [
  //   {value: 0, viewValue: 'Sanitas'},
  //   {value: 1, viewValue: 'Coomeva'}
  // ];
  // fondosPension: FondoPension[] = [
  //   {value: 0, viewValue: 'Porvenir'},
  //   {value: 1, viewValue: 'Sura'}
  // ];
  // cajasCompensacion: CajaCompensacion[] = [
  //   {value: 0, viewValue: 'Comfenalco'},
  //   {value: 1, viewValue: 'Comfama'}
  // ];
  // cesantias: Cesantia[] = [
  //   {value: 0, viewValue: 'AFP Colfondos'},
  //   {value: 1, viewValue: 'AFP Porvenir'}
  // ];

  // typeLicencia = 0;
  // tiposLicencia = [
  //   { value: 0, name: "Pública" },
  //   { value: 1, name: "Privada" }
  // ];
  // coloresPiel: ColorPiel[] = [
  //   {value: 0, viewValue: 'Negro'},
  //   {value: 1, viewValue: 'Trigueño'},
  //   {value: 2, viewValue: 'Blanco'}
  // ];
  // cols : number | undefined;

  // gridByBreakpoint = {
  //   xl: 4,
  //   lg: 3,
  //   md: 2,
  //   sm: 1,
  //   xs: 1
  // };

  // colsAlt : number | undefined;
  // gridByBreakpointAlt = {
  //   xl: 3,
  //   lg: 3,
  //   md: 2,
  //   sm: 1,
  //   xs: 1
  // };

  constructor(
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
    ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    // this.breakpointObserver.observe([
    //   Breakpoints.XSmall,
    //   Breakpoints.Small,
    //   Breakpoints.Medium,
    //   Breakpoints.Large,
    //   Breakpoints.XLarge,
    // ]).subscribe(result => {
    //   if (result.matches) {
    //     if (result.breakpoints[Breakpoints.XSmall]) {
    //       this.cols = this.gridByBreakpoint.xs;
    //     }
    //     if (result.breakpoints[Breakpoints.Small]) {
    //       this.cols = this.gridByBreakpoint.sm;
    //     }
    //     if (result.breakpoints[Breakpoints.Medium]) {
    //       this.cols = this.gridByBreakpoint.md;
    //     }
    //     if (result.breakpoints[Breakpoints.Large]) {
    //       this.cols = this.gridByBreakpoint.lg;
    //     }
    //     if (result.breakpoints[Breakpoints.XLarge]) {
    //       this.cols = this.gridByBreakpoint.xl;
    //     }
    //   }
    //   if (result.matches) {
    //     if (result.breakpoints[Breakpoints.XSmall]) {
    //       this.colsAlt = this.gridByBreakpointAlt.xs;
    //     }
    //     if (result.breakpoints[Breakpoints.Small]) {
    //       this.colsAlt = this.gridByBreakpointAlt.sm;
    //     }
    //     if (result.breakpoints[Breakpoints.Medium]) {
    //       this.colsAlt = this.gridByBreakpointAlt.md;
    //     }
    //     if (result.breakpoints[Breakpoints.Large]) {
    //       this.colsAlt = this.gridByBreakpointAlt.lg;
    //     }
    //     if (result.breakpoints[Breakpoints.XLarge]) {
    //       this.colsAlt = this.gridByBreakpointAlt.xl;
    //     }
    //   }
    // });
  }

  ngOnInit() {
  }

  changeDatosBasicos(evento:any){
    console.log("Evento del hijo", evento);
    this.isDatosBasicos = evento.data;

  }


}


