import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Familiar } from './interfaces/familiar.interface';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CandidatoHv } from './interfaces/hv-candidato.interface';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';
import { EnvService } from 'src/app/services/env.service';

interface Parentesco {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-informacion-familiar-form',
  templateUrl: './informacion-familiar-form.component.html',
  styleUrls: ['./informacion-familiar-form.component.scss'],
})
export class InformacionFamiliarFormComponent implements OnInit {
  @ViewChild('addInfoFamiData', { static: true })
  fieldDatosFamilia!: NgForm;
  public disabledButtonNext: boolean = true;
  public datosBasicos: any = {};
  public idiomas: any[] = [];
  public datosadicionales: any = {};
  public categoriaLicencia: any[] = [];
  public archivos: any[] = [];
  public estudios: any[] = [];
  public referencias: any[] = [];
  public cargos: any[] = [];
  public infoFamilia: any[] = [];

  public idEmp: number = 3;
  public numRegla: number = this.envService.regla;
  public candidatoId = 0;
  parentescos: Parentesco[] = [];

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,40}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.

    correo:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,

    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/, // 7 a 14 numeros.
  };

  public datosInfoFamilia: Familiar = {
    id: 0,
    id_candidato: 0,
    nombre: '',
    idParentesco: null,
    edad: 0,
    ne: 0,
    ec: 0,
    ocupacion: '',
    empresa: '',
    telResidencia: '',
    otroFamiliar: 0,
    accion: 0,
    nit: '',
    fechaNace: new Date(),
  };

  public todosDatosCandidato: TodosDatosCandidato = {
    candidato: {
      id: 0,
      emp: 3,
      id_usuario: 0,
      id_tipo_candidato: null,
      id_rh_tipo_documento: null,
      nit: '',
      estado: 1,
      fecExpedicion: new Date(),
      lugarExpedicion: '',
      idCotClientePais: null,
      nombre: '',
      apellido: '',
      genero: null,
      fecha_nacimiento: new Date(),
      idRhEstadoCivil: null,
      telefono: '',
      mail: '',
      celular: '',
      direccion: '',
      id_cot_cliente_pais: null,
      id_cot_cliente_barrio: null,
      id_rh_experiencia: null,
      id_rh_nivel_academico: null,
      id_rh_perfil: null,
      pais: null,
      paisExp: null,
      depto: null,
      deptoExp: null,
      fuente: '',
      id_rh_experiencia_sector: null,
      id_rh_experiencia_equipo: null,
      id_salario: null,
      salario: null,
      id_rh_fuente_reclutamiento: null,
      tarjeta: '',
      id_Entidad: null,
      id_participacion_anterior: 0,
      id_trajo_hoja_vida: 0,
      id_disponibilidad_viaje: 0,
      runt: 0,
      idRhEps: null,
      idRhFondoPension: null,
      idRhFondoCaja: null,
      idRhFondoCesantias: null,
      licencia: '',
      tipo_licencia: null,
      fecha_vence_licencia: new Date(),
      id_rh_categoria: null,
      id_rh_color_piel: null,
      id_rh_grupo_sanguineo: null,
      rh: null,
      peso: null,
      altura: null,
    },
    referencias_familiares: [
      // ...this.infoFamilia
    ],
    estudios: [
      // ...this.estudios
    ],
    idiomas: [
      // ...this.idiomas
    ],
    referencias: [
      //  ...this.referencias
    ],
    categorias: [
      // ...this.categoriaLicencia
    ],
    cargos: [
      //  ...this.cargos
    ],
  };

  public columnsReference: any[] = [
    'nit',
    'nombre',
    'fechaNace',
    'idParentesco',
    'telResidencia',
    'borrar',
  ];
  public FAMILIAR_DATA: Familiar[] = [];

  public myReferenceArray: any[] = [];
  public setRelatives = {
    id: 0,
    id_candidato: 0,
    nombre: '',
    idParentesco: null,
    edad: 0,
    ne: 0,
    ec: 0,
    ocupacion: '',
    empresa: '',
    telResidencia: '',
    otroFamiliar: 0,
    accion: 0,
    nit: '',
    fechaNace: new Date(),
  };

  stepperOrientation: Observable<StepperOrientation>;
  cols: number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };
  public tabActive: boolean = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _storaged: SessionStorageService,
    private _addItemTable: AddLabelToTableService,
    private readonly apiService: ApiService,
    private readonly envService: EnvService,
    private readonly messageService: MessagesService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

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
      });
  }
  ngOnChanges() {}
  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );

    this.getLocalStorage();

    const idEmp = this.envService.company;
    const numRegla = this.numRegla;

    const parentesco = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'parentesco'
    );
    if (parentesco === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las opciones de parentezco'
      );
      return;
    }
    this.parentescos = _.orderBy(parentesco, ['id'], ['asc']);

    this.todosDatosCandidato = this._storaged.get('todosCandidatoStorage');

    if (
      this.todosDatosCandidato.referencias_familiares &&
      this.todosDatosCandidato.referencias_familiares.length > 0
    ) {
      this.myReferenceArray = [
        ...this.todosDatosCandidato.referencias_familiares,
      ];
    }

    loading.close();
  }

  ngOnDestroy() {
    this.todosDatosCandidato.referencias_familiares = [
      ...this.myReferenceArray,
    ];

    this._storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
  }

  public async selectsValidate(
    selectContent: any,
    text: string,
    arrayData: any
  ) {
    if (selectContent === null) {
      setTimeout(() => {
        this.messageService.error(
          'Error',
          'Error interno del servidor al cargar ' + text
        );
      }, 1000);
    } else {
      arrayData = selectContent;
    }
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

  addReference() {
    if (this.fieldDatosFamilia.valid) {
      this.FAMILIAR_DATA.push(this.setRelatives);

      this.myReferenceArray.push(this.setRelatives);
      this.setRelatives = {
        id: 0,
        id_candidato: 0,
        nombre: '',
        idParentesco: null,
        edad: 0,
        ne: 0,
        ec: 0,
        ocupacion: '',
        empresa: '',
        telResidencia: '',
        otroFamiliar: 0,
        accion: 0,
        nit: '',
        fechaNace: new Date(),
      };
      this.myReferenceArray = [...this.myReferenceArray];
      console.warn(this.myReferenceArray);
      this.datosInfoFamilia.fechaNace = new Date();
    } else {
      this.messageService.info(
        'Atención',
        'Para agregar información sobre sus estudios debe llenar todos los campos ... Por favor verifique que no haya campos vacios o sin seleccionar.'
      );
      this.fieldDatosFamilia.control.markAllAsTouched();
    }
  }

  public borrarItem(index: number) {
    this.myReferenceArray.splice(index, 1);
    this.myReferenceArray = [...this.myReferenceArray];
  }

  public hideItem(index: number) {
    this.myReferenceArray[index].accion = 1;
    this.myReferenceArray[index].hidden = true;
  }

  public guardarProgreso() {
    this.todosDatosCandidato.referencias_familiares = [
      ...this.myReferenceArray,
    ];
    this.todosDatosCandidato.candidato.fecha_vence_licencia = new Date();
    this._storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
    this.disabledButtonNext = false;

    this.messageService.success(
      'Progreso Guardado',
      'Su progreso se guardó de manera correcta'
    );
  }

  public getLocalStorage() {}

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

  public async enviarFormulario(): Promise<void> {
    const idUsuarioHv = await this.updateInformation(
      '/hojadevida/candidato',
      this.todosDatosCandidato
    );

    if (idUsuarioHv === 0) {
      this.messageService.error(
        'Error',
        'No se pudo almacenar la información del candidato'
      );
      this.messageService.info(
        'Atención',
        'Revise que todos los campos requeridos o contacte con un administrador '
      );
    } else {
      this.messageService.success(
        'Candidato Guardado',
        'Los datos del candidato se han enviado correctamente'
      );

      this._storaged.clear();
      window.location.reload();
      // this.activeTab.emit(false);
    }
  }

  public labelTable(id: number, list: any[]) {
    return this._addItemTable.findLabel(id, list);
  }
}
