import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, OnChanges, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Sociodemograficos } from './interfaces/sociodemograficos.interface';

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
  public isDisable: boolean = true;
  public buttonDisabled: boolean = true;

  public sociodemograficos: Sociodemograficos = {
    consentimiento: -1,
    empresa:'',
    sede:'',
    area:'',
    fechaIngreso: new Date,
    antiguedadEmpresa: 0,
    antiguedadCargo: 0,
    promedioIngresos: 0,
    arl: 0,
    tipoAfiliadoEps: 0,
    paisNacimiento: 0,
    deptoNacimiento: 0,
    ciudadNacimiento: 0,
    caracteristicasVivienda: 0,
    zonaVivienda: 0,
    cuentaConServicios: 0,
    serviciosVivienda: 0,
    tamanoVivienda: 0,
    condicionesVivienda: 0,
    estratoServicios: 0,
    numPesonasVive: 0,
    numHijos: 0,
    edadHijos: 0,
    dependenciaEconomica: 0,
    familiarDiscapacitado: 0,
    tipoTransporte: 0,
    rutaSegura: 0,
    tiempoLibre: 0,
    reduceDescanso: '',
    actividadFisica: 0,
    fumador: 0,
    accesoSalud: 0,
    lentesMedicados: 0,
  }

  public showFields = false;
  typeAfiliado = 0;
  tiposAfiliado = [
    { value: 0, name: "Dependiente" },
    { value: 1, name: "Independiente" }
  ];

  optionsYesNo = [
    { value: 1, name: "Si" },
    { value: 0, name: "No" }
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
    {value: 4, viewValue: 'Internet'},
  ];
  dependencias: DependeEconomica[] = [
    {value: 0, viewValue: 'Hijos'},
    {value: 1, viewValue: 'Madre'},
    {value: 2, viewValue: 'Padre'},
    {value: 3, viewValue: 'Pareja'},
    {value: 4, viewValue: 'Familiar'},
  ];

  tiposTransporte: TipoTransporte[] = [
    {value: 0, viewValue: 'Caminando'},
    {value: 1, viewValue: 'Bicicleta'},
    {value: 2, viewValue: 'Moto'},
    {value: 3, viewValue: 'Vehiculo Particular'},
    {value: 4, viewValue: 'Transporte Público'},
  ];



  cols : number | undefined;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  }
  colsAlt : number | undefined;

  gridByBreakpointAlt = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1
  };

  constructor(private breakpointObserver: BreakpointObserver, private messages: MessagesService) {
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

  public onChange(event: any){
    console.log('OnChanges', event);
    if( event.value != -1){
      this.buttonDisabled = false;
    }
  }

  ngOnInit(): void {
  }

  public enviarSociodemograficos(){
    console.log('Enviar', this.sociodemograficos);
    if(this.sociodemograficos.consentimiento == 0){
      this.messages.info("Consentimiento no aceptado", "Ha marcado NO en la casilla de consentimiento informado, solo almacenaremos esta respuesta.");
    }else if(this.sociodemograficos.consentimiento == 1){
      this.messages.success("Perfecto", "Los datos sociodemográficos se almacenaron correctamente");
    }else{
      this.messages.error("Error", "No se pudo almacenar la información");
    }

  }


}
