import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';

interface Pais{
  value: number;
  viewValue: string;
}
interface AniosExperiencia{
  id: number;
  descripcion: string;
}
interface AspiracionSalarial{
  id: number;
  descripcion: string;
}
interface FuenteReclutamiento{
  id: number;
  descripcion: string;
}
interface EntidadExpedicion{
  id: number;
  descripcion: string;
}
interface EPS{
  id: number;
  descripcion: string;
}
interface FondoPension{
  id: number;
  descripcion: string;
}
interface CajaCompensacion{
  id: number;
  descripcion: string;
}
interface Cesantia{
  id: number;
  descripcion: string;
}
interface GrupoSanguineo{
  id: number;
  descripcion: string;
}
interface ColorPiel{
  id: number;
  descripcion: string;
}
interface CategoriaLicencia{
  id: number;
  descripcion: string;
}
interface Licencia{
    idCandidato: 0;
    idCategoria: 0;
    fechaVence: string;
    id: number;
    accion: number;
}
interface DatosAdicionalesCandidato{
  id_rh_experiencia_sector: number;
  id_rh_experiencia_equipo: number;
  id_salario: number;
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

  public idEmp: number = 3;
  public numRegla: number = 159;

  public  aniosExp: AniosExperiencia[] = [];
  public salarios: AspiracionSalarial[] = [];
  public fuentesReclutamiento: FuenteReclutamiento[] = [];
  public entidades: EntidadExpedicion[] = [];
  public epss: EPS[] = [];
  public fondosPension: FondoPension[] = [];
  public cajasCompensacion: CajaCompensacion[] = [];
  public cesantias: Cesantia[] = [];
  public categoriasLicencia: CategoriaLicencia[] = [];
  public gruposSanguineos: GrupoSanguineo[] = [];
  public coloresPiel: ColorPiel[] = [];


  public columnsReference: any[] = ["id", "fecha_vence", "categoria", 'borrar' ];
  public LICENCE_DATA: Licencia[] = [];

  public myReferenceArray: any[] = [];

  public setLicences: Licencia = {
    idCandidato: 0,
    idCategoria: 0,
    fechaVence: "2022-09-22T14:55:44.760Z",
    id: 0,
    accion: 0,
  }

 public disabledButtonNext: boolean = true;

 public datosAdicionales: DatosAdicionalesCandidato = {
  id_rh_experiencia_sector: 0,
  id_rh_experiencia_equipo: 0,
  id_salario: 0,
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

  tiposLicencia = [
    { id: 1, descripcion: "Pública" },
    { id: 2, descripcion: "Privada" }
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
    private _storaged: SessionStorageService,
    private _addItemTable: AddLabelToTableService,
    private readonly messageService: MessagesService,
    private apiService: ApiService
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

  async ngOnInit(): Promise<void> {
    // const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const experienciaEspecifica = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'experiencia');
    this.aniosExp = experienciaEspecifica;

    const aspiracionSalarial = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'rango_salario');
    this.salarios = aspiracionSalarial;

    const fuenteReclutamiento = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fuente_reclutamiento');
    this.fuentesReclutamiento = fuenteReclutamiento;

    const entidadExpedicion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'entidad');
    this.entidades = entidadExpedicion;

    const eps = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'eps');
    this.epss = eps;

    const fondoPension = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_pension');
    this.fondosPension = fondoPension;

    const cajaCompensacion = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_caja');
    this.cajasCompensacion = cajaCompensacion;

    const cesantia = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'fondo_cesantias');
    this.cesantias = cesantia;

    const categoriaLicencia = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'categoria_licencia');
    this.categoriasLicencia = categoriaLicencia;

    const grupoSanguineo = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'grupo_sanguineo');
    this.gruposSanguineos = grupoSanguineo;

    const colorPiel = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'color_piel');
    this.coloresPiel = colorPiel;

  //  loading.close();
  }

  addReference() {
    this.LICENCE_DATA.push(this.setLicences);
    console.log('Data reference',this.LICENCE_DATA);
    this.myReferenceArray.push(this.setLicences);
    this.setLicences = {
      idCandidato: 0,
      idCategoria: 0,
      fechaVence: "2022-09-22T14:55:44.760Z",
      id: 0,
      accion: 0,
    };
    this.myReferenceArray = [...this.myReferenceArray];
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
    this._storaged.set('datosLicencia', this.myReferenceArray);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Datos Adicionales', this.datosAdicionales);
    // this.datosAdicionales = this._storaged.get('datosAdicionalesStorage');
  }
}
