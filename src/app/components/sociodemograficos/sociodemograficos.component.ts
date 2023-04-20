import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Sociodemograficos } from './interfaces/sociodemograficos.interface';
import * as _ from 'lodash';

interface AnioAntiguedad {
  id: number;
  descripcion: string;
}
interface AnioAntigEmpresa {
  id: number;
  descripcion: string;
}
interface RangoEdad {
  id: number;
  descripcion: string;
}
interface Salario {
  id: number;
  descripcion: string;
}
interface CaracteristicaVivienda {
  id: number;
  descripcion: string;
}
interface UbicacionVivienda {
  id: number;
  descripcion: string;
}
interface EstratoServicios {
  id: number;
  descripcion: string;
}
interface ServicioVivienda {
  id: number;
  descripcion: string;
}
interface IdServiciosVivi {
  check: boolean;
  id: number;
  descripcion: string;
}
interface DependeEconomica {
  id: number;
  descripcion: string;
}
interface TipoTransporte {
  id: number;
  descripcion: string;
}
interface Pais {
  id: string;
  descripcion: string;
}
interface Depto {
  id: string;
  descripcion: string;
}
interface Ciudad {
  id: string;
  descripcion: string;
}
@Component({
  selector: 'app-sociodemograficos',
  templateUrl: './sociodemograficos.component.html',
  styleUrls: ['./sociodemograficos.component.scss'],
})
export class SociodemograficosComponent implements OnInit {
  @Input() initComponent = false;
  @ViewChild('sociodemograficosForm', { static: true })
  fieldSociodemograficos!: NgForm;

  public idEmp: number = 3;
  public numRegla: number = 159;

  public isDisable: boolean = true;
  public buttonDisabled: boolean = true;
  public selectedServices: any = [];

  public sociodemograficos: Sociodemograficos = {
    idRhCandidato: null,
    consentimientoinformado: null,
    idAntiguedadCargo: null,
    idAntiguedadEmpresa: null,
    idTipoAfiliacion: null,
    numeroHijos: null,
    idEdadHijos: null,
    idingresos: null,
    idCaracteristicaVivienda: null,
    idZonaUbica: null,
    idEstratoServicios: null,
    serviciosVivienda: '',
    servicios: null, // cuenta con servicios
    personasVive: null,
    tamanoVivienda: null,
    condicionVivienda: null,
    personasDepende: '',
    personaDiscapacidad: null,
    serviciosSalud: null,
    tipoTransporte: '',
    rutaSegura: null,
    tiempoDescanso: null,
    otrasActividades: '',
    actividadFisica: null,
    fumador: null,
    usaLentes: null,
    // empresa:'',
    // sede:'',
    // area:'',e
    // fechaIngreso: new Date,
    // arl: 0,
    // paisNacimiento: 0,
    // deptoNacimiento: 0,
    // ciudadNacimiento: 0,
  };
  public serviciosVivienda: any[] = [];
  public personasDepende: any[] = [];
  public tipoTransporte: any[] = [];

  public showFields = false;
  typeAfiliado = 0;
  tiposAfiliado = [
    { value: 0, name: 'Dependiente' },
    { value: 1, name: 'Independiente' },
  ];

  optionsYesNo = [
    { value: 1, name: 'Si' },
    { value: 0, name: 'No' },
  ];

  aniosAntigCargo: AnioAntiguedad[] = [];
  aniosAntigEmpresa: AnioAntigEmpresa[] = [];
  rangosEdad: RangoEdad[] = [
    { id: 0, descripcion: '0 a 2 años' },
    { id: 1, descripcion: '2 a 5 años' },
  ];
  salarios: Salario[] = [];
  caracteristicas: CaracteristicaVivienda[] = [
    { id: 0, descripcion: 'Arrendada' },
    { id: 1, descripcion: 'Propia' },
    { id: 2, descripcion: 'Familiar' },
  ];
  ubicaciones: UbicacionVivienda[] = [];
  estratos: EstratoServicios[] = [];
  paises: Pais[] = [];
  deptos: Depto[] = [];
  ciudades: Ciudad[] = [];

  serviciosPublicos: IdServiciosVivi[] = [];

  dependencias: DependeEconomica[] = [];

  tiposTransporte: TipoTransporte[] = [];

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/, // 10 a 15 numeros.
  };

  cols: number | undefined;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1,
  };
  colsOne: number | undefined;
  gridByBreakpointOne = {
    xl: 1,
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
  };
  colsAlt: number | undefined;

  gridByBreakpointAlt = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1,
  };

  constructor(
    private storaged: SessionStorageService,
    private breakpointObserver: BreakpointObserver,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
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
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.colsOne = this.gridByBreakpointOne.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.colsOne = this.gridByBreakpointOne.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.colsOne = this.gridByBreakpointOne.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.colsOne = this.gridByBreakpointOne.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.colsOne = this.gridByBreakpointOne.xl;
          }
        }
      });
  }

  public onChange(event: any) {
    if (event.value != -1) {
      this.buttonDisabled = false;
      this.sociodemograficos.consentimientoinformado = event.value;
    }
  }

  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );

    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const paises = await this.getAnyInformation('/pais/' + idEmp);
    if (paises === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los paises'
      );
      return;
    }
    this.paises = _.orderBy(paises, ['id'], ['asc']);

    const aniosAntigEmpresa = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdAntiEmp'
    );

    if (aniosAntigEmpresa === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los años de antigüedad en la empresa'
      );
      return;
    }
    this.aniosAntigEmpresa = _.orderBy(aniosAntigEmpresa, ['id'], ['asc']);

    const aniosAntigCargo = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdAnticargo'
    );

    if (aniosAntigCargo === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los años de antigüedad en el cargo'
      );
      return;
    }
    this.aniosAntigCargo = _.orderBy(aniosAntigCargo, ['id'], ['asc']);

    const promIngresos = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdIngresos'
    );

    if (promIngresos === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los años de antigüedad en el cargo'
      );
      return;
    }
    this.salarios = _.orderBy(promIngresos, ['id'], ['asc']);

    const ubicacionVivienda = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdZona'
    );

    if (ubicacionVivienda === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las zonas de ubicación'
      );
      return;
    }
    this.ubicaciones = _.orderBy(ubicacionVivienda, ['id'], ['asc']);

    const estratos = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdEstratos'
    );

    if (estratos === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los datos de estratificación social '
      );
      return;
    }
    this.estratos = _.orderBy(estratos, ['id'], ['asc']);

    const personasDependen = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdPersDepe'
    );

    if (personasDependen === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los'
      );
      return;
    }
    this.dependencias = _.orderBy(personasDependen, ['id'], ['asc']);
    //
    const tiposTransporte = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdTipoTrans'
    );

    if (tiposTransporte === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los tipos de transporte'
      );
      return;
    }
    this.tiposTransporte = _.orderBy(tiposTransporte, ['id'], ['asc']);

    const IdServiciosVivi = await this.getAnyInformation(
      '/hojadevida/subcriterios/' +
        idEmp +
        '/' +
        numRegla +
        '/' +
        'IdServiciosVivi'
    );

    if (IdServiciosVivi === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las opciones de servicios públicos'
      );
      return;
    }
    this.serviciosPublicos = _.orderBy(IdServiciosVivi, ['id'], ['asc']);

    this.serviciosPublicos.forEach((element) => {
      element.check = false;
    });

    const rangoEdadHijos = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdEdadHijo'
    );

    if (rangoEdadHijos === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los rangos de edad '
      );
      return;
    }
    this.rangosEdad = _.orderBy(rangoEdadHijos, ['id'], ['asc']);

    const caracteristicasVivienda = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdCaraVivi'
    );

    if (caracteristicasVivienda === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los años de antigüedad en el cargo'
      );
      return;
    }
    this.caracteristicas = _.orderBy(caracteristicasVivienda, ['id'], ['asc']);

    const candidatoExistente = this.storaged.get('todosCandidatoStorage');
    const existenteSociodemograficos = this.storaged.get('sociodemograficos');

    if (existenteSociodemograficos && existenteSociodemograficos != null) {
      this.sociodemograficos = existenteSociodemograficos;
      this.buttonDisabled = false;
    }

    const getServiciosCandidato = this.sociodemograficos.serviciosVivienda
      ? this.sociodemograficos.serviciosVivienda.split(',')
      : [];

    this.serviciosVivienda = [...getServiciosCandidato];

    const getPersonasDepende = this.sociodemograficos.personasDepende
      ? this.sociodemograficos.personasDepende.split(',')
      : [];

    this.personasDepende = [...getPersonasDepende];

    const getTipoTransporte = this.sociodemograficos.tipoTransporte
      ? this.sociodemograficos.tipoTransporte.split(',')
      : [];

    this.tipoTransporte = [...getTipoTransporte];

    loading.close();
  }

  ngOnDestroy() {}

  public selected(event: any) {}

  public transformToString() {
    this.sociodemograficos.serviciosVivienda = this.serviciosVivienda.join();
    this.sociodemograficos.personasDepende = this.personasDepende.join();
    this.sociodemograficos.tipoTransporte = this.tipoTransporte.join();
  }

  private async getAnyInformation(service: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getInformacion(service).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(null);
        },
      });
    });
  }

  private async updateInformation(
    service: string,
    document: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.updateInformacion(service, document).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(0);
        },
      });
    });
  }

  public async enviarSociodemograficos(): Promise<void> {
    this.transformToString();
    this.storaged.set('Sociodemograficos', this.sociodemograficos);

    if (this.sociodemograficos.consentimientoinformado === 0) {
      this.messageService.info(
        'Consentimiento no aceptado',
        'Ha marcado NO en la casilla de consentimiento informado, solo almacenaremos esta respuesta.'
      );
    } else if (this.sociodemograficos.consentimientoinformado === 1) {
      if (!this.fieldSociodemograficos.valid) {
        this.messageService.error(
          'Error',
          'Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.'
        );
        this.fieldSociodemograficos.control.markAllAsTouched();
      } else {
        const idUsuarioHv = await this.updateInformation(
          '/hojadevida/sociodemograficos',
          this.sociodemograficos
        );

        this.messageService.success(
          'Perfecto',
          'Los datos sociodemográficos se almacenaron correctamente'
        );
        this.storaged.clear();
        window.location.reload();
      }
    } else {
      this.messageService.error('Error', 'No se pudo almacenar la información');
    }
  }
}
