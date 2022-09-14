import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';

interface Pais{
  value: number;
  viewValue: string;
}
interface AniosExperiencia{
  value: number;
  viewValue: string;
}
interface AspiracionSalarial{
  value: number;
  viewValue: string;
}
interface FuenteReclutamiento{
  value: number;
  viewValue: string;
}
interface EntidadExpedicion{
  value: number;
  viewValue: string;
}
interface EPS{
  value: number;
  viewValue: string;
}
interface FondoPension{
  value: number;
  viewValue: string;
}
interface CajaCompensacion{
  value: number;
  viewValue: string;
}
interface Cesantia{
  value: number;
  viewValue: string;
}
interface ColorPiel{
  value: number;
  viewValue: string;
}
interface CategoriaLicencia{
  value: number;
  viewValue: string;
}
interface DatosAdicionalesCandidato{

}
@Component({
  selector: 'app-datos-adicionales-form',
  templateUrl: './datos-adicionales-form.component.html',
  styleUrls: ['./datos-adicionales-form.component.scss']
})
export class DatosAdicionalesFormComponent implements OnInit {
 public disabledButtonNext: boolean = true;
 public datosAdicionales: DatosAdicionalesCandidato = {

 }
  public tipo_licencia = 0;
  public licencia = '';
  public tarjeta = '';

  @Input() tipoCandidato: number = 1;

  public operacionesDisabled = true;
  paises: Pais[] = [
    {value: 0, viewValue: 'Argentina'},
    {value: 1, viewValue: 'Bolivia'},
    {value: 2, viewValue: 'Brasil'},
    {value: 3, viewValue: 'Colombia'},
    {value: 4, viewValue: 'Ecuador'},
    {value: 5, viewValue: 'Perú'}
  ];
  aniosExp: AniosExperiencia[] = [
    {value: 0, viewValue: '1 Año a 2 Años'},
    {value: 1, viewValue: '2 Años a 3 Años'}
  ];
  categorias: CategoriaLicencia[] = [
    {value: 0, viewValue: 'A1'},
    {value: 1, viewValue: 'B1'}
  ];
  salarios: AspiracionSalarial[] = [
    {value: 0, viewValue: '1.000.000$ - 1.500.000$'},
    {value: 1, viewValue: '1.500.000$ - 2.500.000$'}
  ];
  fuentesReclutamiento: FuenteReclutamiento[] = [
    {value: 0, viewValue: 'LinkedIn'},
    {value: 1, viewValue: 'Computrabajo'}
  ];
  entidades: EntidadExpedicion[] = [
    {value: 0, viewValue: 'CONSEJO PROFESIONAL NACIONAL DE TECNÓLOGOS EN ELECTRICIDAD, ELECTROMECÁNICA, ELECTRÓNICA Y AFINES- CONALTEL'},
    {value: 1, viewValue: 'CONSEJO NACIONAL DE INGENIERÍAS ELÉCTRICA, MECÁNICA Y PROFESIONES AFINES'}
  ];
  epss: EPS[] = [
    {value: 0, viewValue: 'Sanitas'},
    {value: 1, viewValue: 'Coomeva'}
  ];
  fondosPension: FondoPension[] = [
    {value: 0, viewValue: 'Porvenir'},
    {value: 1, viewValue: 'Sura'}
  ];
  cajasCompensacion: CajaCompensacion[] = [
    {value: 0, viewValue: 'Comfenalco'},
    {value: 1, viewValue: 'Comfama'}
  ];
  cesantias: Cesantia[] = [
    {value: 0, viewValue: 'AFP Colfondos'},
    {value: 1, viewValue: 'AFP Porvenir'}
  ];


  tiposLicencia = [
    { value: 0, name: "Pública" },
    { value: 1, name: "Privada" }
  ];
  coloresPiel: ColorPiel[] = [
    {value: 0, viewValue: 'Negro'},
    {value: 1, viewValue: 'Trigueño'},
    {value: 2, viewValue: 'Blanco'}
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
  constructor(private breakpointObserver: BreakpointObserver, private _storaged: LocalStorageService) {
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

    });
  }

  ngOnInit(): void {
  }

  public guardarProgreso(){
    console.log('Datos Adicionales', this.datosAdicionales);
    this._storaged.set('datosAdicionalesStorage', this.datosAdicionales);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    console.log('Cargar Datos Adicionales', this.datosAdicionales);
    this._storaged.get('datosAdicionalesStorage');
  }
}
