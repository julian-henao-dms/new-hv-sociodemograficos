import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';

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
interface Licencia{
  licencia: string;
  tipo_licencia: number;
  fecha_vence_licencia: string;
  id_rh_categoria: number;
}
interface DatosAdicionalesCandidato{
  id_rh_experiencia_sector: number;
  id_rh_experiencia_equipo: number;
  aspiracion: number;
  salario_especifico: number;
  id_rh_fuente_reclutamiento: number;
  tarjeta: string;
  id_Entidad: number;
  id_participacion_anterior: number;
  id_trajo_hoja_vida: number;
  id_disponibilidad_viaje: number;
  runt: number;
  idRhEps: number;
  idRhFondoPension: number;
  idRhFondoCaja: number;
  idRhFondoCesantias: number;
  licencia: string;
  tipo_licencia: number;
  fecha_vence_licencia: string;
  id_rh_categoria: number;
  id_rh_color_piel: number;
  id_rh_grupo_sanguineo: number;
  rh: number;
  peso: number;
  altura: number;
}
@Component({
  selector: 'app-datos-adicionales-form',
  templateUrl: './datos-adicionales-form.component.html',
  styleUrls: ['./datos-adicionales-form.component.scss']
})
export class DatosAdicionalesFormComponent implements OnInit {

  public columnsReference: any[] = ["licencia", "tipo_licencia", "fecha_vence", "categoria", 'borrar' ];
  public LICENCE_DATA: Licencia[] = [];

  public myReferenceArray: any[] = [];

  public setLicences: Licencia = {
    licencia: '',
    tipo_licencia: 0,
    fecha_vence_licencia: '',
    id_rh_categoria: 0,
  }

 public disabledButtonNext: boolean = true;

 public datosAdicionales: DatosAdicionalesCandidato = {
  id_rh_experiencia_sector: 0,
  id_rh_experiencia_equipo: 0,
  aspiracion: 0,
  salario_especifico: 0,
  id_rh_fuente_reclutamiento: 0,
  tarjeta: '',
  id_Entidad: 0,
  id_participacion_anterior: 0,
  id_trajo_hoja_vida: 0,
  id_disponibilidad_viaje: 0,
  runt: 0,
  idRhEps: 0,
  idRhFondoPension: 0,
  idRhFondoCaja: 0,
  idRhFondoCesantias: 0,
  licencia: '',
  tipo_licencia: 0,
  fecha_vence_licencia: '',
  id_rh_categoria: 0,
  id_rh_color_piel: 0,
  id_rh_grupo_sanguineo: 0,
  rh: 0,
  peso: 0,
  altura: 0,
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
    {value: 1, viewValue: 'A1'},
    {value: 2, viewValue: 'B1'},
    {value: 2, viewValue: 'C1'},
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
    { value: 1, name: "Pública" },
    { value: 2, name: "Privada" }
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
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _storaged: LocalStorageService,
    private _addItemTable: AddLabelToTableService
    ) {
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

  addReference() {
    this.LICENCE_DATA.push(this.setLicences);
    console.log('Data reference',this.LICENCE_DATA);
    this.myReferenceArray.push(this.setLicences);
    this.setLicences = {
      licencia: '',
      tipo_licencia: 0,
      fecha_vence_licencia: '',
      id_rh_categoria: 0,
    };
    this.myReferenceArray = [...this.myReferenceArray];


    console.warn(this.myReferenceArray);
  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
  }

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

  public guardarProgreso(){
    console.log('Datos Adicionales', this.datosAdicionales);
    this._storaged.set('datosAdicionalesStorage', this.datosAdicionales);
    this._storaged.set('datosLicencia', this.setLicences);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Datos Adicionales', this.datosAdicionales);
    // this.datosAdicionales = this._storaged.get('datosAdicionalesStorage');
  }
}
