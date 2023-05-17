import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import {
  DatosBasicosCandidato,
  Idioma,
  IdiomaCandidato,
  PerfilCandidato,
  Perfiles,
  TodosDatosCandidato,
} from './interfaces/candidato.interface';
import * as _ from 'lodash';
import { MatStepper } from '@angular/material/stepper';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Sociodemograficos } from '../sociodemograficos/interfaces/sociodemograficos.interface';

interface TipoCandidato {
  id: number;
  descripcion: string;
}
interface TipoDocumento {
  id: string;
  descripcion: string;
}
interface PaisExp {
  id: number;
  codigo: string;
  descripcion: string;
  id_cot_cliente_pais: number;
}
interface DeptoExp {
  id: number;
  descripcion: string;
}
interface Pais {
  id: number;
  codigo: string;
  descripcion: string;
  id_cot_cliente_pais: number;
}
interface Depto {
  id: number;
  descripcion: string;
}
interface Ciudad {
  id: number;
  descripcion: string;
}
interface Barrio {
  id: string;
  descripcion: string;
}
interface NivelAcademico {
  id: number;
  descripcion: string;
}
interface LenguajeExtranjera {
  id: number;
  descripcion: string;
}
interface EstadoCivil {
  id: number;
  descripcion: string;
}
interface Cargo {
  id: number;
  descripcion: string;
}
interface AniosExperiencia {
  id: number;
  descripcion: string;
}
interface Perfil {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.scss'],
})
export class DatosBasicosFormComponent implements OnInit {
  @Output() changeSelect = new EventEmitter<any>();
  @ViewChild('datosBasicosForm', { static: true })
  fieldDatosBasicos!: NgForm;

  @ViewChild('idIdi') selectIdioma: MatSelect | undefined;

  @ViewChild('stepper') stepper!: MatStepper;
  @Output() activeTab = new EventEmitter<boolean>();
  @Output() flexibleTabs = new EventEmitter<boolean>();
  public mostrarOpciones = true;

  public typeCandidato: number = 0;
  public candidatoId = 0;

  public idEmp: number = 3;
  public numRegla: number = 159;
  public paises: Pais[] = [];
  public deptos: Depto[] = [];
  public paisesExp: PaisExp[] = [];
  public deptosExp: DeptoExp[] = [];
  public tiposDocumento: TipoDocumento[] = [];
  public estados: EstadoCivil[] = [];
  public aniosExp: AniosExperiencia[] = [];
  public nivelesAcademia: NivelAcademico[] = [];
  public cargos: Cargo[] = [];
  public lenguas: LenguajeExtranjera[] = [];
  public ciudades: Ciudad[] = [];
  public ciudadesExp: Ciudad[] = [];
  public barrios: Barrio[] = [];
  public idiomasPrevios: Idioma[] = [];
  public cargosPrevios: Perfiles[] = [];

  public todosDatosCandidato: TodosDatosCandidato = {
    candidato: {
      id: 0,
      emp: 3,
      id_usuario: 1,
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

  public newIdiomas: any[] = [];

  public licenceArray: any[] = [];
  public studiesArray: any[] = [];
  public referenceArray: any[] = [];
  public idPerfilPrevio: any[] = [];
  public perfiles: Perfil[] = [];
  public cargosArray: any[] = [];
  public familyArray: any[] = [];

  public idiomasCandidatoExistente: IdiomaCandidato = {
    id: 0,
    idIdi: 0,
    id_rh_candidato: 0,
    id_rh_idioma: 0,
    descripcion: '',
  };

  public otrosCargos: Perfiles = {
    id: 0,
    idPerfil: 0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
  };

  public paisExpedicion = 0;
  public depto = 0;
  public ciudad = 0;

  public idIdiPrevio: any[] = [];
  public idiomasArray: any[] = [];
  public disabledButtonNext: boolean = true;

  public idiomasCandidato: Idioma = {
    id: 0,
    idIdi: 0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
  };

  colsAlt: number | undefined;

  gridByBreakpointAlt = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };
  cols: number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };

  public tiposCandidato: TipoCandidato[] = [
    { id: 0, descripcion: 'Personal Táctico y Soporte' },
    { id: 1, descripcion: 'Personal Operativo' },
  ];

  public expresiones = {
    numbersText: /^[A-Za-z0-9_-]{1,20}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    textSpacesAccent: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    correo: /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/,
    // correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    nums: /^\d{7,15}$/, // 7 a 14 numeros.
    celular: /^\d{10,15}$/, // 7 a 14 numeros.
  };
  public todosLugares: any;

  constructor(
    private storaged: SessionStorageService,
    private breakpointObserver: BreakpointObserver,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService
  ) {
    //

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
      });
  }

  ngAfterViewInit() {}

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

    const paisesExp = await this.getAnyInformation('/pais/' + idEmp);
    if (paisesExp === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los paisesExp'
      );
      return;
    }
    this.paisesExp = _.orderBy(paisesExp, ['id'], ['asc']);

    const tipoDocumento = await this.getAnyInformation(
      '/hojadevida/subcriterios/' +
        idEmp +
        '/' +
        numRegla +
        '/' +
        'tipo_documento'
    );
    if (tipoDocumento === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los tipos de documento'
      );
      return;
    }
    this.tiposDocumento = _.orderBy(tipoDocumento, ['id'], ['asc']);

    const estadoCivil = await this.getAnyInformation(
      '/hojadevida/subcriterios/' +
        idEmp +
        '/' +
        numRegla +
        '/' +
        'estado_civil'
    );
    if (estadoCivil === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las opciones de estado civil'
      );
      return;
    }
    this.estados = _.orderBy(estadoCivil, ['id'], ['asc']);

    const experienciaEspecifica = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'experiencia'
    );
    if (experienciaEspecifica === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las opciones de experiencia'
      );
      return;
    }
    this.aniosExp = _.orderBy(experienciaEspecifica, ['id'], ['asc']);

    const nivelAcademico = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'academico'
    );
    if (nivelAcademico === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los niveles académicos'
      );
      return;
    }
    this.nivelesAcademia = _.orderBy(nivelAcademico, ['id'], ['asc']);

    const lenguaExtranjera = await this.getAnyInformation(
      '/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'idioma'
    );
    if (lenguaExtranjera === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los idiomas'
      );
      return;
    }
    this.lenguas = _.orderBy(lenguaExtranjera, ['id'], ['asc']);

    const cargoAplica = await this.getAnyInformation(
      '/hojadevida/perfiles/' + idEmp
    );
    if (cargoAplica === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los perfiles'
      );
      return;
    }
    this.cargos = _.orderBy(cargoAplica, ['id'], ['asc']);

    const datosTodosCandidatoStorage = this.storaged.get(
      'todosCandidatoStorage'
    );

    if (datosTodosCandidatoStorage && datosTodosCandidatoStorage != null) {
      this.todosDatosCandidato = datosTodosCandidatoStorage;
    }

    if (this.todosDatosCandidato.candidato.nit != '') {
      const getIdiomas = this.todosDatosCandidato.idiomas.filter(
        (idioma) => idioma.accion == 0
      );

      if (getIdiomas && getIdiomas.length > 0) {
        const getIdio = getIdiomas.map(
          (element: { idIdi: number }) => element.idIdi
        );
        this.idIdiPrevio = [...getIdio];
      }

      if (this.todosDatosCandidato.candidato.estado === 2) {
        this.activeTab.emit(false);
      }

      this.todosLugares = await this.getAnyInformation(
        '/pais/all/' + this.idEmp
      );

      const ciudadDeptoExp = this.todosLugares.find(
        (depto: { id: number | null }) =>
          depto.id === this.todosDatosCandidato.candidato.idCotClientePais
      );
      const ciudadDeptoUbiq = this.todosLugares.find(
        (depto: { id: number | null }) =>
          depto.id === this.todosDatosCandidato.candidato.id_cot_cliente_pais
      );

      const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais;
      const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais;

      const deptoPais = this.todosLugares.find(
        (pais: { id: number | null }) => pais.id === deptoCiudad
      );
      const deptoPaisExp = this.todosLugares.find(
        (pais: { id: number | null }) => pais.id === deptoCiudadExp
      );
      const paisCandidato = deptoPais.id_cot_cliente_pais;
      const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

      this.todosDatosCandidato.candidato.paisExp = paisCandidatoExp;
      this.onSelectionChangePaisExp(paisCandidatoExp);
      this.todosDatosCandidato.candidato.deptoExp = deptoCiudadExp;
      this.onSelectionChangeDeptoExp(deptoCiudadExp);
      this.todosDatosCandidato.candidato.idCotClientePais =
        this.todosDatosCandidato.candidato.idCotClientePais;

      this.todosDatosCandidato.candidato.pais = paisCandidato;
      this.onSelectionChangePais(paisCandidato);
      this.todosDatosCandidato.candidato.depto = deptoCiudad;
      this.onSelectionChangeDepto(deptoCiudad);
      this.todosDatosCandidato.candidato.id_cot_cliente_pais =
        this.todosDatosCandidato.candidato.id_cot_cliente_pais;
      this.onSelectionChangeCiudad(
        this.todosDatosCandidato.candidato.id_cot_cliente_pais
      );
      this.todosDatosCandidato.candidato.id_cot_cliente_barrio =
        this.todosDatosCandidato.candidato.id_cot_cliente_barrio;

      if (
        this.todosDatosCandidato.idiomas &&
        this.todosDatosCandidato.idiomas.length > 0
      ) {
        const getIdio = this.todosDatosCandidato.idiomas.map(
          (element: { idIdi: number }) => element.idIdi
        );

        this.idIdiPrevio = [...getIdio];

        this.idiomasArray = this.idIdiPrevio.map((idIdi) => ({
          ...this.idiomasCandidato,
          idIdi,
        }));

        this.todosDatosCandidato.idiomas = [...this.idiomasArray];
      }

      this.todosDatosCandidato.candidato.id_usuario = 1;
    } else {
      this.todosDatosCandidato = this.todosDatosCandidato;
    }

    loading.close();
  }

  public ngOnChanges() {}

  public async search(): Promise<void> {
    this.storaged.clear();
    if (this.todosDatosCandidato.candidato.nit !== '') {
      this.messageService.info(
        'Atencion',
        'Estamos cargando los datos del candidato'
      );
      const idEmp = this.idEmp;
      const candidatoExistente = await this.getAnyInformation(
        '/hojadevida/candidato/0?identificacion=' +
          this.todosDatosCandidato.candidato.nit
      );

      if (candidatoExistente && candidatoExistente.length > 0) {
        this.flexibleTabs.emit(false);
        this.todosDatosCandidato.candidato.id = candidatoExistente[0].id;
        this.todosDatosCandidato.candidato.emp = idEmp;
        this.todosDatosCandidato.candidato.nit = candidatoExistente[0].nit;
        this.todosDatosCandidato.candidato.id_rh_tipo_documento =
          candidatoExistente[0].id_rh_tipo_documento;
        this.todosDatosCandidato.candidato.nombre =
          candidatoExistente[0].nombre;
        this.todosDatosCandidato.candidato.apellido =
          candidatoExistente[0].apellido;
        this.todosDatosCandidato.candidato.genero =
          candidatoExistente[0].genero;
        this.todosDatosCandidato.candidato.fecha_nacimiento =
          candidatoExistente[0].fecha_nacimiento;
        // this.todosDatosCandidato.candidato.id_cot_cliente_barrio = candidatoExistente[0].id_cot_cliente_barrio;
        this.todosDatosCandidato.candidato.direccion =
          candidatoExistente[0].direccion;
        this.todosDatosCandidato.candidato.telefono =
          candidatoExistente[0].telefono;
        this.todosDatosCandidato.candidato.celular =
          candidatoExistente[0].celular;
        this.todosDatosCandidato.candidato.mail = candidatoExistente[0].mail;
        this.todosDatosCandidato.candidato.id_rh_perfil =
          candidatoExistente[0].id_rh_perfil;
        this.todosDatosCandidato.candidato.idCotClientePais =
          candidatoExistente[0].id_cot_cliente_pais2;
        this.todosDatosCandidato.candidato.id_cot_cliente_pais =
          candidatoExistente[0].id_cot_cliente_pais;
        this.todosDatosCandidato.candidato.id_rh_nivel_academico =
          candidatoExistente[0].id_rh_nivel_academico;
        this.todosDatosCandidato.candidato.id_rh_experiencia =
          candidatoExistente[0].id_rh_experiencia;
        this.todosDatosCandidato.candidato.id_tipo_candidato =
          candidatoExistente[0].id_tipo_candidato;

        this.todosDatosCandidato.candidato.idRhEstadoCivil =
          candidatoExistente[0].id_rh_estado_civil;
        this.todosDatosCandidato.candidato.fecExpedicion =
          candidatoExistente[0].fecha_exp_cedula;
        this.todosDatosCandidato.candidato.lugarExpedicion =
          candidatoExistente[0].lugar_exp_cedula;
        const estadoCandidato = candidatoExistente[0].estado;
        if (estadoCandidato === 2) {
          this.activeTab.emit(false);
        } else {
          this.activeTab.emit(true);
        }

        this.sociodemograficos.idRhCandidato = candidatoExistente[0].id;
        this.sociodemograficos.consentimientoinformado = candidatoExistente[0]
          .consentimiento_informado
          ? candidatoExistente[0].consentimiento_informado
          : 0;

        this.sociodemograficos.idAntiguedadCargo = candidatoExistente[0]
          .id_antiguedad_cargo
          ? candidatoExistente[0].id_antiguedad_cargo
          : 0;
        this.sociodemograficos.idAntiguedadEmpresa = candidatoExistente[0]
          .id_antiguedad_empresa
          ? candidatoExistente[0].id_antiguedad_empresa
          : 0;
        this.sociodemograficos.idTipoAfiliacion =
          candidatoExistente[0].id_tipo_afiliacion != null
            ? candidatoExistente[0].id_tipo_afiliacion
            : 0;
        this.sociodemograficos.numeroHijos = candidatoExistente[0].numero_hijos
          ? candidatoExistente[0].numero_hijos
          : 0;
        this.sociodemograficos.idEdadHijos = candidatoExistente[0].id_edad_hijos
          ? candidatoExistente[0].id_edad_hijos
          : 0;
        this.sociodemograficos.idingresos = candidatoExistente[0].id_ingresos
          ? candidatoExistente[0].id_ingresos
          : 0;
        this.sociodemograficos.idCaracteristicaVivienda = candidatoExistente[0]
          .id_caracteristica_vivienda
          ? candidatoExistente[0].id_caracteristica_vivienda
          : 0;
        this.sociodemograficos.idZonaUbica = candidatoExistente[0].id_zona_ubica
          ? candidatoExistente[0].id_zona_ubica
          : 0;
        this.sociodemograficos.idEstratoServicios = candidatoExistente[0]
          .id_estrato_servicios
          ? candidatoExistente[0].id_estrato_servicios
          : 0;
        this.sociodemograficos.serviciosVivienda =
          candidatoExistente[0].servicios_vivienda;
        this.sociodemograficos.servicios = candidatoExistente[0].servicios
          ? candidatoExistente[0].servicios
          : 0;
        this.sociodemograficos.personasVive = candidatoExistente[0]
          .personas_vive
          ? candidatoExistente[0].personas_vive
          : 0;
        this.sociodemograficos.tamanoVivienda = candidatoExistente[0]
          .tamano_vivienda
          ? candidatoExistente[0].tamano_vivienda
          : 0;
        this.sociodemograficos.condicionVivienda = candidatoExistente[0]
          .condicion_vivienda
          ? candidatoExistente[0].condicion_vivienda
          : 0;
        this.sociodemograficos.personasDepende =
          candidatoExistente[0].personas_depende;
        this.sociodemograficos.personaDiscapacidad = candidatoExistente[0]
          .persona_discapacidad
          ? candidatoExistente[0].persona_discapacidad
          : 0;
        this.sociodemograficos.serviciosSalud = candidatoExistente[0]
          .servicios_salud
          ? candidatoExistente[0].servicios_salud
          : 0;
        this.sociodemograficos.tipoTransporte =
          candidatoExistente[0].tipo_transporte;
        this.sociodemograficos.rutaSegura = candidatoExistente[0].ruta_segura
          ? candidatoExistente[0].ruta_segura
          : 0;
        this.sociodemograficos.tiempoDescanso = candidatoExistente[0]
          .tiempo_descanso
          ? candidatoExistente[0].tiempo_descanso
          : 0;
        this.sociodemograficos.otrasActividades =
          candidatoExistente[0].otras_actividades;
        this.sociodemograficos.actividadFisica = candidatoExistente[0]
          .actividad_fisica
          ? candidatoExistente[0].actividad_fisica
          : 0;
        this.sociodemograficos.fumador = candidatoExistente[0].fumador
          ? candidatoExistente[0].fumador
          : 0;
        this.sociodemograficos.usaLentes = candidatoExistente[0].usa_lentes
          ? candidatoExistente[0].usa_lentes
          : 0;

        this.storaged.set('sociodemograficos', this.sociodemograficos);

        this.todosLugares = await this.getAnyInformation(
          '/pais/all/' + this.idEmp
        );

        this.candidatoId = candidatoExistente[0].id;

        const ciudadDeptoExp = this.todosLugares.find(
          (depto: { id: number | null }) =>
            depto.id === this.todosDatosCandidato.candidato.idCotClientePais
        );
        const ciudadDeptoUbiq = this.todosLugares.find(
          (depto: { id: number | null }) =>
            depto.id === this.todosDatosCandidato.candidato.id_cot_cliente_pais
        );

        const deptoCiudad = ciudadDeptoUbiq.id_cot_cliente_pais;
        const deptoCiudadExp = ciudadDeptoExp.id_cot_cliente_pais;

        const deptoPais = this.todosLugares.find(
          (pais: { id: number | null }) => pais.id === deptoCiudad
        );
        const deptoPaisExp = this.todosLugares.find(
          (pais: { id: number | null }) => pais.id === deptoCiudadExp
        );
        const paisCandidato = deptoPais.id_cot_cliente_pais;
        const paisCandidatoExp = deptoPaisExp.id_cot_cliente_pais;

        this.todosDatosCandidato.candidato.paisExp = paisCandidatoExp;
        this.onSelectionChangePaisExp(paisCandidatoExp);
        this.todosDatosCandidato.candidato.deptoExp = deptoCiudadExp;
        this.onSelectionChangeDeptoExp(deptoCiudadExp);
        this.todosDatosCandidato.candidato.idCotClientePais =
          this.todosDatosCandidato.candidato.idCotClientePais;

        this.todosDatosCandidato.candidato.pais = paisCandidato;
        this.onSelectionChangePais(paisCandidato);
        this.todosDatosCandidato.candidato.depto = deptoCiudad;
        this.onSelectionChangeDepto(deptoCiudad);
        this.todosDatosCandidato.candidato.id_cot_cliente_pais =
          this.todosDatosCandidato.candidato.id_cot_cliente_pais;
        this.onSelectionChangeCiudad(
          this.todosDatosCandidato.candidato.id_cot_cliente_pais
        );
        this.todosDatosCandidato.candidato.id_cot_cliente_barrio =
          candidatoExistente[0].id_cot_cliente_barrio;

        // idiomas
        const getIdiomas = await this.getAnyInformation(
          '/hojadevida/idiomas/' + this.candidatoId
        );
        const getIdioB: Idioma[] = getIdiomas.map((idioma: IdiomaCandidato) => {
          return {
            id: idioma.id,
            idIdi: idioma.id_rh_idioma,
            idCandidato: idioma.id_rh_candidato,
            idUsuario: 0,
            accion: 0,
          };
        });

        const getIdio = getIdiomas.map(
          (element: { id_rh_idioma: number }) => element.id_rh_idioma
        );
        this.idIdiPrevio = [...getIdio];

        this.idiomasPrevios = [...getIdioB];

        this.storaged.set('idiomasOriginales', this.idiomasPrevios);

        this.idiomasArray = this.idIdiPrevio.map((idIdi) => ({
          ...this.idiomasCandidato,
          idIdi,
        }));

        this.todosDatosCandidato.idiomas = [...this.idiomasPrevios];

        //Fin idiomas

        // Datos adicionales
        this.todosDatosCandidato.candidato.id_rh_experiencia_sector =
          candidatoExistente[0].id_rh_experiencia_sector
            ? candidatoExistente[0].id_rh_experiencia_sector
            : 0;
        this.todosDatosCandidato.candidato.id_rh_experiencia_equipo =
          candidatoExistente[0].id_rh_experiencia_equipo;
        this.todosDatosCandidato.candidato.id_salario =
          candidatoExistente[0].id_salario;
        this.todosDatosCandidato.candidato.salario =
          candidatoExistente[0].salario; //verificar
        this.todosDatosCandidato.candidato.id_rh_fuente_reclutamiento =
          candidatoExistente[0].id_rh_fuente_reclutamiento;
        this.todosDatosCandidato.candidato.tarjeta =
          candidatoExistente[0].tarjeta;
        this.todosDatosCandidato.candidato.id_Entidad =
          candidatoExistente[0].id_rh_entidad; //verificar
        this.todosDatosCandidato.candidato.id_participacion_anterior =
          candidatoExistente[0].id_participacion_anterior;
        this.todosDatosCandidato.candidato.id_trajo_hoja_vida =
          candidatoExistente[0].id_trajo_hoja_vida;
        this.todosDatosCandidato.candidato.id_disponibilidad_viaje =
          candidatoExistente[0].id_disponibilidad_viaje;
        this.todosDatosCandidato.candidato.runt = candidatoExistente[0].runt;
        this.todosDatosCandidato.candidato.idRhEps =
          candidatoExistente[0].id_rh_eps;
        this.todosDatosCandidato.candidato.idRhFondoPension =
          candidatoExistente[0].id_rh_fondo_pension;
        this.todosDatosCandidato.candidato.idRhFondoCaja =
          candidatoExistente[0].id_rh_fondo_caja;
        this.todosDatosCandidato.candidato.idRhFondoCesantias =
          candidatoExistente[0].id_rh_fondo_cesantias;
        this.todosDatosCandidato.candidato.licencia =
          candidatoExistente[0].licencia;
        this.todosDatosCandidato.candidato.tipo_licencia =
          candidatoExistente[0].tipo_licencia;
        this.todosDatosCandidato.candidato.fecha_vence_licencia =
          candidatoExistente[0].fecha_vence_licencia;
        this.todosDatosCandidato.candidato.id_rh_categoria =
          candidatoExistente[0].id_rh_categoria;
        this.todosDatosCandidato.candidato.id_rh_color_piel =
          candidatoExistente[0].id_rh_color_piel;
        this.todosDatosCandidato.candidato.id_rh_grupo_sanguineo =
          candidatoExistente[0].id_rh_grupo_sanguineo;
        this.todosDatosCandidato.candidato.rh = candidatoExistente[0].rh;
        this.todosDatosCandidato.candidato.peso = candidatoExistente[0].peso;
        this.todosDatosCandidato.candidato.altura =
          candidatoExistente[0].altura;
        // Fin Datos adicionales

        // Licencias
        const getCategoriasLic = await this.getAnyInformation(
          '/hojadevida/categorias/' + this.candidatoId
        );

        const newArrayLicencias = getCategoriasLic.map(
          (obj: {
            id: number;
            id_rh_candidato: number;
            id_rh_categoria: number;
            categoria: string;
            fecha_vencimiento: Date;
          }) => ({
            id: obj.id,
            idCandidato: obj.id_rh_candidato,
            idCategoria: obj.id_rh_categoria,
            fechaVence: obj.fecha_vencimiento,
            accion: 0,
          })
        );

        this.licenceArray = [...newArrayLicencias];
        this.todosDatosCandidato.categorias = [...newArrayLicencias];

        // Fin Licencias

        // datos estudios

        const getEstudios = await this.getAnyInformation(
          '/hojadevida/estudios/' + this.candidatoId
        );

        const newArrayEstudio = getEstudios.map(
          (obj: {
            id: number;
            id_rh_candidato: number;
            id_rh_profesion: number | null;
            id_rh_institucion: number | null;
            fecha_desde: Date;
            fecha_hasta: Date;
            id_estado_estudio: number | null;
            id_tipo_estudio: number | null;
            id_nivel_estudio: number | null;
            id_tipo_curso: number | null;
          }) => ({
            id: obj.id,
            idEstudio: obj.id_rh_profesion,
            idCandidato: obj.id_rh_candidato,
            idUsuario: 0,
            idInstitucion: obj.id_rh_institucion,
            fecha_Desde: obj.fecha_desde,
            fecha_Hasta: obj.fecha_hasta,
            id_estado_estudio: obj.id_estado_estudio,
            id_tipo_estudio: obj.id_tipo_estudio,
            id_nivel_estudio: obj.id_nivel_estudio ? obj.id_nivel_estudio : 0,
            id_tipo_curso: obj.id_tipo_curso ? obj.id_tipo_curso : 0,
            accion: 0,
          })
        );

        this.studiesArray = [...newArrayEstudio];
        this.todosDatosCandidato.estudios = [...newArrayEstudio];

        // fin datos estudios

        // Referencias
        const getReferencias = await this.getAnyInformation(
          '/hojadevida/referencias/' + this.candidatoId
        );

        const newArrayReference = getReferencias.map(
          (obj: {
            id: number;
            cargo: string;
            celular: string;
            empresa: string;
            id_rh_candidato: number;
            mail: string;
            motivo_retiro: string;
            nombre: string;
            observaciones: string;
            observaciones_det: string;
            telefono: string;
            tiempo_laborado: string;
            tipo: number;
            tipo_ref: string;
          }) => ({
            id: obj.id,
            idCandidato: obj.id_rh_candidato,
            nombre: obj.nombre,
            celular: obj.celular,
            telefono: obj.telefono,
            mail: obj.mail,
            tipo: obj.tipo,
            idUsuario: 0,
            empresa: obj.empresa,
            Cargo: obj.cargo,
            Observaciones: obj.observaciones,
            TiempoLaborado: obj.tiempo_laborado,
            MotivoRetiro: obj.motivo_retiro,
            accion: 0,
          })
        );

        this.referenceArray = [...newArrayReference];
        this.todosDatosCandidato.referencias = [...newArrayReference];

        // Fin Referencias

        // Cargos
        const getCargos = await this.getAnyInformation(
          '/hojadevida/candidatoPerfiles/' + this.candidatoId
        );

        const getCargosB: Perfiles[] = getCargos.map(
          (perfil: PerfilCandidato) => {
            return {
              id: perfil.id,
              idPerfil: perfil.id_rh_perfil,
              idCandidato: perfil.id_rh_candidato,
              idUsuario: 0,
              accion: 0,
            };
          }
        );

        const newArr = getCargos.map(
          (item: { id_rh_perfil: number }) => item.id_rh_perfil
        );
        this.idPerfilPrevio = [...newArr];

        this.cargosPrevios = [...getCargosB];
        this.storaged.set('cargosOriginales', this.cargosPrevios);

        this.cargosArray = this.idPerfilPrevio.map((idPerfil) => ({
          ...this.otrosCargos,
          idPerfil,
        }));
        this.todosDatosCandidato.cargos = [...this.cargosPrevios];
        // Fin cargos

        // Info Familiar

        const getInfoFamiliar = await this.getAnyInformation(
          '/hojadevida/familiares/' + this.candidatoId
        );

        const newArrayFamiliar = getInfoFamiliar.map(
          (obj: {
            fecha_nacimiento: Date;
            id: number;
            id_rh_candidato: number;
            id_rh_parentesco: number | null;
            nit: string;
            nombre: string;
            parentesco: string;
            tel_residencia: string;
          }) => ({
            id: obj.id,
            id_candidato: obj.id_rh_candidato,
            nombre: obj.nombre,
            idParentesco: obj.id_rh_parentesco,
            edad: 0,
            ne: 0,
            ec: 0,
            ocupacion: '',
            empresa: '',
            telResidencia: obj.tel_residencia,
            otroFamiliar: 0,
            accion: 0,
            nit: obj.nit,
            fechaNace: obj.fecha_nacimiento,
          })
        );

        this.familyArray = [...newArrayFamiliar];
        this.todosDatosCandidato.referencias_familiares = [...newArrayFamiliar];

        // Fin Info Familiar

        this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
      } else {
        setTimeout(() => {
          this.messageService.info(
            'Atención...',
            'El documento ingresado no tiene ningún formulario previamente diligenciado'
          );
          this.storaged.clear();
          this.limpiarCampos();
          this.idIdiPrevio = [];
          this.activeTab.emit(true);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        this.todosDatosCandidato;
        this.messageService.info(
          'Atención...',
          'Debe digitar un número de documento para realizar la consulta'
        );
      }, 1000);
    }
  }

  public async selectsValidate(
    selectContent: any,
    text: string,
    arrayData: any
  ) {
    if (selectContent === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar ' + text
      );
      return;
    }
    //
  }

  public validateChanged(event: any) {}

  public limpiarCampos() {
    this.todosDatosCandidato.candidato.id = 0;
    this.todosDatosCandidato.candidato.emp = 3;
    this.todosDatosCandidato.candidato.id_rh_tipo_documento = null;
    this.todosDatosCandidato.candidato.nombre = '';
    this.todosDatosCandidato.candidato.apellido = '';
    this.todosDatosCandidato.candidato.genero = null;
    this.todosDatosCandidato.candidato.fecha_nacimiento = new Date();
    this.todosDatosCandidato.candidato.id_cot_cliente_barrio = null;
    this.todosDatosCandidato.candidato.direccion = '';
    this.todosDatosCandidato.candidato.telefono = '';
    this.todosDatosCandidato.candidato.celular = '';
    this.todosDatosCandidato.candidato.mail = '';
    this.todosDatosCandidato.candidato.id_rh_perfil = null;
    this.todosDatosCandidato.candidato.idCotClientePais = null;
    this.todosDatosCandidato.candidato.id_cot_cliente_pais = null;
    this.todosDatosCandidato.candidato.paisExp = null;
    this.todosDatosCandidato.candidato.deptoExp = null;
    this.todosDatosCandidato.candidato.pais = null;
    this.todosDatosCandidato.candidato.depto = null;
    this.todosDatosCandidato.candidato.id_rh_nivel_academico = null;
    this.todosDatosCandidato.candidato.id_rh_experiencia = null;
    this.todosDatosCandidato.candidato.id_tipo_candidato = null;

    this.todosDatosCandidato.candidato.idRhEstadoCivil = null;
    this.todosDatosCandidato.candidato.fecExpedicion = new Date();
    this.todosDatosCandidato.candidato.lugarExpedicion = '';
  }

  public async onSelectionChangePais(idPais: number | null): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;

    const deptos = await this.getAnyInformation(
      '/pais/departamentos/' + idEmp + '/' + idPais
    );
    if (deptos === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los departamentos'
      );
    } else {
      this.deptos = _.orderBy(deptos, ['id'], ['asc']);

      loading.close();
    }
  }
  public async onSelectionChangePaisExp(idPais: number | null): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;

    const deptosExp = await this.getAnyInformation(
      '/pais/departamentos/' + idEmp + '/' + idPais
    );
    if (deptosExp === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los departamentos'
      );
    } else {
      this.deptosExp = _.orderBy(deptosExp, ['id'], ['asc']);

      loading.close();
    }
  }
  public async onSelectionChangeDeptoExp(
    idDepto: number | null
  ): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;

    const ciudadesExp = await this.getAnyInformation(
      '/pais/ciudades/' + idEmp + '/' + idDepto
    );
    if (ciudadesExp.length === 0) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las ciudadesExp'
      );
      return;
    }

    this.ciudadesExp = _.orderBy(ciudadesExp, ['id'], ['asc']);

    loading.close();
  }

  public async onSelectionChangeDepto(idDepto: number | null): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;

    const ciudades = await this.getAnyInformation(
      '/pais/ciudades/' + idEmp + '/' + idDepto
    );
    if (ciudades.length === 0) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar las ciudades'
      );
      return;
    }

    this.ciudades = _.orderBy(ciudades, ['id'], ['asc']);

    loading.close();
  }
  public async onSelectionChangeCiudad(idCiudad: number | null): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;

    const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
    if (barrios === null) {
      this.messageService.error(
        'Error',
        'Error interno del servidor al cargar los barrios'
      );
      return;
    } else {
      this.barrios = _.orderBy(barrios, ['id'], ['asc']);

      loading.close();
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

  public onChange(event: any) {
    this.changeSelect.emit({ data: event });
  }

  ngOnDestroy() {
    const originals = this.storaged.get('idiomasOriginales');
    if (originals && originals.length > 0) {
      const newIdiomas = this.compararArreglos(originals, this.idIdiPrevio);
      this.todosDatosCandidato.idiomas = [...newIdiomas];
    } else {
      this.idiomasArray = this.idIdiPrevio.map((idIdi) => ({
        ...this.idiomasCandidato,
        idIdi,
      }));

      this.todosDatosCandidato.idiomas = [...this.idiomasArray];
    }
    this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
  }
  public guardarProgreso() {
    if (!this.fieldDatosBasicos.valid) {
      this.messageService.error(
        'Error',
        'Debe llenar todos los campos requeridos... Por favor verifique los campos indicados.'
      );
      this.fieldDatosBasicos.control.markAllAsTouched();
    } else {
      const originals = this.storaged.get('idiomasOriginales');
      if (originals && originals.length > 0) {
        const newIdiomas = this.compararArreglos(originals, this.idIdiPrevio);
        this.todosDatosCandidato.idiomas = [...newIdiomas];
      } else {
        this.idiomasArray = this.idIdiPrevio.map((idIdi) => ({
          ...this.idiomasCandidato,
          idIdi,
        }));

        this.todosDatosCandidato.idiomas = [...this.idiomasArray];
      }

      this.storaged.set('todosCandidatoStorage', this.todosDatosCandidato);
      this.messageService.success(
        'Progreso Guardado',
        'Su progreso se guardó de manera correcta'
      );
      this.disabledButtonNext = false;
    }
  }


  public compararArreglos(originals: any[], itemPrevio: number[]): Idioma[] {
    const filterLanguajes: Idioma[] = [];

    // Copiar objetos del array a al array c y marcar como eliminados si no están en el array b
    for (const itemA of originals) {
      const newItem: Idioma = { ...itemA };
      if (!itemPrevio.includes(itemA.idIdi)) {
        newItem.accion = 1;
      }
      filterLanguajes.push(newItem);
    }

    // Agregar nuevos objetos a partir del array b
    for (const itemB of itemPrevio) {
      const foundItem = originals.find((item) => item.idIdi === itemB);

      if (!foundItem) {
        const newItem: Idioma = {
          id: 0,
          idIdi: itemB,
          idCandidato: 0,
          idUsuario: 0,
          accion: 0,
        };
        filterLanguajes.push(newItem);
      }
    }

    return filterLanguajes;
  }
}
