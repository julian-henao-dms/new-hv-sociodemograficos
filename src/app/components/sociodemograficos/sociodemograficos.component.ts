import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

interface AnioAntiguedad{
  value: number;
  viewValue: string;
}
interface AnioAntigEmpresa{
  value: number;
  viewValue: string;
}
interface RangoEdad{
  value: number;
  viewValue: string;
}
interface Salario{
  value: number;
  viewValue: string;
}
interface CaracteristicaVivienda{
  value: number;
  viewValue: string;
}
interface UbicacionVivienda{
  value: number;
  viewValue: string;
}
interface EstratoServicios{
  value: number;
  viewValue: string;
}
interface ServicioVivienda{
  value: number;
  viewValue: string;
}
interface NumPersonasVive{
  value: number;
  viewValue: string;
}
interface DependeEconomica{
  value: number;
  viewValue: string;
}
interface TipoTransporte{
  value: number;
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
@Component({
  selector: 'app-sociodemograficos',
  templateUrl: './sociodemograficos.component.html',
  styleUrls: ['./sociodemograficos.component.scss']
})
export class SociodemograficosComponent implements OnInit {
  typeAfiliado = 0;
  tiposAfiliado = [
    { value: 0, name: "Dependiente" },
    { value: 1, name: "Independiente" }
  ];
  consentimiento = new FormControl('');
  optionsYesNo = [
    { value: 0, name: "Si" },
    { value: 1, name: "No" }
  ];

  aniosAntiguedad: AnioAntiguedad[] = [
    {value: 0, viewValue: '0-1 años'},
    {value: 1, viewValue: '1 a 5 años'},

  ];
  aniosAntigEmpresa: AnioAntigEmpresa[] = [
    {value: 0, viewValue: '0-1 años'},
    {value: 1, viewValue: '1 a 5 años'}
  ];
  rangosEdad: RangoEdad[] = [
    {value: 0, viewValue: '0 a 2 años'},
    {value: 1, viewValue: '2 a 5 años'}
  ];
  salarios: Salario[] = [
    {value: 0, viewValue: '0 a 2 años'},
    {value: 1, viewValue: '2 a 5 años'}

  ];
  caracteristicas: CaracteristicaVivienda[] = [
    {value: 0, viewValue: 'Arrendada'},
    {value: 1, viewValue: 'Propia'},
    {value: 2, viewValue: 'Familiar'}
  ];
  ubicaciones: UbicacionVivienda[] = [
    {value: 0, viewValue: 'Rural'},
    {value: 1, viewValue: 'Urbana'}
  ];
  estratos: EstratoServicios[] = [
    {value: 0, viewValue: '1'},
    {value: 1, viewValue: '2'},
    {value: 2, viewValue: '3'},
    {value: 3, viewValue: '4'},
  ];
  numPersonas: NumPersonasVive[] = [
    {value: 0, viewValue: '1'},
    {value: 1, viewValue: '2'},
    {value: 2, viewValue: '3'},
    {value: 3, viewValue: '4'},
    {value: 4, viewValue: '5'},
    {value: 5, viewValue: '6 o más'},
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
  serviciosVivienda = new FormControl('');
  dependenciaFamiliar = new FormControl('');
  serviciosPublicosFamilia = new FormControl('');
  transporteTrabajo = new FormControl('');
  serviciosPublicos: EstratoServicios[] = [
    {value: 0, viewValue: 'Agua Potable'},
    {value: 1, viewValue: 'Luz'},
    {value: 2, viewValue: 'Gas'},
    {value: 3, viewValue: 'Teléfono'},
    {value: 3, viewValue: 'Internet'},
  ];
  dependencias: DependeEconomica[] = [
    {value: 0, viewValue: 'Hijos'},
    {value: 1, viewValue: 'Madre'},
    {value: 2, viewValue: 'Padre'},
    {value: 3, viewValue: 'Pareja'},
    {value: 3, viewValue: 'Familiar'},
  ];

  tiposTransporte: TipoTransporte[] = [
    {value: 0, viewValue: 'Caminando'},
    {value: 1, viewValue: 'Bicicleta'},
    {value: 2, viewValue: 'Moto'},
    {value: 3, viewValue: 'Vehiculo Particular'},
    {value: 3, viewValue: 'Transporte Público'},
  ];

  sociodemograficos = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  cols : number | undefined;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  }

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

    });
   }

  ngOnInit(): void {
  }


}
