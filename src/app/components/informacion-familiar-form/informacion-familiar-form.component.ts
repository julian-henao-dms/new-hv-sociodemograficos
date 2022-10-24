import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Familiar } from './interfaces/familiar.interface';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AddLabelToTableService } from 'src/app/services/add-label-to-table.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CandidatoHv } from './interfaces/hv-candidato.interface';

interface Parentesco{
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-informacion-familiar-form',
  templateUrl: './informacion-familiar-form.component.html',
  styleUrls: ['./informacion-familiar-form.component.scss']
})
export class InformacionFamiliarFormComponent implements OnInit {

public todosDatosCandidato: CandidatoHv = {
  candidato: {
    id: 0,
    emp: 0,
    nit: '',
    id_rh_tipo_documento: 0,
    nombre: '',
    apellido: '',
    id_usuario: 0,
    genero: 0,
    fecha_nacimiento: new Date,
    id_cot_cliente_pais: 0,
    direccion: '',
    telefono: '',
    celular: '',
    mail: '',
    id_rh_perfil: 0,
    id_cot_cliente: 0,
    id_rh_requisicion_personal: 0,
    id_rh_nivel_academico: 0,
    id_rh_experiencia: 0,
    observaciones: '',
    id_tipo_candidato: 0,
    id_rh_experiencia_sector: 0,
    id_disponibilidad_viaje: 0,
    id_participacion_anterior: 0,
    id_salario: 0,
    id_rh_fuente_reclutamiento: 0,
    id_trajo_hoja_vida: 0,
    estado: 0,
    bloqueado: 0,
    motivo: '',
    licencia: '',
    tarjeta: '',
    tipo_licencia: 0,
    fecha_vence_licencia: new Date,
    runt: 0,
    id_rh_categoria: 0,
    id_rh_color_piel: 0,
    id_rh_grupo_sanguineo: 0,
    rh: 0,
    id_rh_experiencia_equipo: 0,
    peso: 0,
    altura: 0,
    salario: 0,
    accion: 0,
    id_Usuario_Asociado: 0,
    id_con_cco: 0,
    id_Entidad: 0,
    fecExpedicion: new Date,
    lugarExpedicion: '',
    idRhEstadoCivil: 0,
    idRhEps: 0,
    idRhFondoPension: 0,
    idRhFondoCaja: 0,
    idRhFondoCesantias: 0,
    id_cot_cliente_barrio: 0,
    sync: 0,
    idCotClientePais: 0
},
referencias_familiares: [
    {
        id: 0,
        id_candidato: 0,
        nombre: '',
        idParentesco: 0,
        edad: 0,
        ne: 0,
        ec: 0,
        ocupacion: '',
        empresa: '',
        telResidencia: '',
        otroFamiliar: 0,
        accion: 0,
        nit: '',
        fechaNace: new Date
    }
],
estudios: [
    {
        id: 0,
        idEstudio: 0,
        idCandidato: 0,
        idUsuario: 0,
        idInstitucion: 0,
        fecha_Desde: new Date,
        fecha_Hasta: new Date,
        id_estado_estudio: 0,
        id_tipo_estudio: 0,
        id_nivel_estudio: 0,
        id_tipo_curso: 0,
        accion: 0
    }
],
idiomas: [
    {
        id: 0,
        idIdi: 0,
        idCandidato: 0,
        idUsuario: 0,
        accion: 0
    }
],
referencias: [
    {
        id: 0,
        idCandidato: 0,
        nombre: '',
        celular: '',
        telefono: '',
        mail: '',
        tipo: 0,
        idUsuario: 0,
        empresa: '',
        Cargo: '',
        Observaciones: '',
        TiempoLaborado: '',
        MotivoRetiro: '',
        accion: 0
    }
],
categorias: [
    {
        id: 0,
        idCandidato: 0,
        IdCategoria: 0,
        FechaVence: new Date,
        accion: 0,
    }
],
cargos: [
    {
        id: 0,
        idCandidato: 0,
        idPerfil: 0,
        idUsuario: 0,
        accion: 0
    }
]

}
public datosBasicos: any = {};
public idiomas: any[] = [];
public datosadicionales: any = {};
public categoriaLicencia: any[] = [];
public archivos: any[] = [];
public estudios: any[] = [];
public referencias: any[] = [];
public cargos: any[] = [];
public inforFamilia: any[] = [];

  public idEmp: number = 3;
  public numRegla: number = 159;
  parentescos: Parentesco[] = [];



  public datosInfoFamilia: Familiar ={
    id_candidato: 0,
    nombre: '',
    id_Parentesco: 0,
    edad: 0,
    ne: 0,
    ec: 0,
    ocupacion: '',
    empresa: '',
    telResidencia: '',
    otroFamiliar: 0,
    id: 0,
    accion: 0,
    nit: '',
    fechaNace: new Date,
   };


  public columnsReference: any[] = ["identificacion", "nombre", "fecha_nace", "parentezco", "telefono", 'borrar' ];
  public FAMILIAR_DATA: Familiar[] = [];

  public myReferenceArray: any[] = [];
  public setRelatives = {
    id_candidato: 0,
    nombre: '',
    id_Parentesco: 0,
    edad: 0,
    ne: 0,
    ec: 0,
    ocupacion: '',
    empresa: '',
    telResidencia: '',
    otroFamiliar: 0,
    id: 0,
    accion: 0,
    nit: '',
    fechaNace: new Date,
  };

  // public datosCompletosCandidato: CandidatoHv = {

  // }


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
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService
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
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');

    this.getLocalStorage();
    this.todosDatosCandidato = {
      candidato: {
        id: 0,
        emp: 0,
        nit: '',
        id_rh_tipo_documento: 0,
        nombre: this.datosBasicos.nombre,
        apellido: this.datosBasicos.apellido,
        id_usuario: 0,
        genero: this.datosBasicos.genero,
        fecha_nacimiento: new Date,
        id_cot_cliente_pais: 0,
        direccion: this.datosBasicos.direccion,
        telefono: this.datosBasicos.telefono,
        celular: this.datosBasicos.celular,
        mail: this.datosBasicos.mail,
        id_rh_perfil: 0,
        id_cot_cliente: 0,
        id_rh_requisicion_personal: 0,
        id_rh_nivel_academico: 0,
        id_rh_experiencia: 0,
        observaciones: '',
        id_tipo_candidato: 0,
        id_rh_experiencia_sector: 0,
        id_disponibilidad_viaje: 0,
        id_participacion_anterior: 0,
        id_salario: 0,
        id_rh_fuente_reclutamiento: 0,
        id_trajo_hoja_vida: 0,
        estado: 0,
        bloqueado: 0,
        motivo: '',
        licencia: '',
        tarjeta: '',
        tipo_licencia: 0,
        fecha_vence_licencia: new Date,
        runt: 0,
        id_rh_categoria: 0,
        id_rh_color_piel: 0,
        id_rh_grupo_sanguineo: 0,
        rh: 0,
        id_rh_experiencia_equipo: 0,
        peso: 0,
        altura: 0,
        salario: 0,
        accion: 0,
        id_Usuario_Asociado: 0,
        id_con_cco: 0,
        id_Entidad: 0,
        fecExpedicion: new Date,
        lugarExpedicion: '',
        idRhEstadoCivil: this.datosBasicos.idRhEstadoCivil,
        idRhEps: 0,
        idRhFondoPension: 0,
        idRhFondoCaja: 0,
        idRhFondoCesantias: 0,
        id_cot_cliente_barrio: 0,
        sync: 0,
        idCotClientePais: 0
    },
    referencias_familiares: [
        {
            id: 0,
            id_candidato: 0,
            nombre: '',
            idParentesco: 0,
            edad: 0,
            ne: 0,
            ec: 0,
            ocupacion: '',
            empresa: '',
            telResidencia: '',
            otroFamiliar: 0,
            accion: 0,
            nit: '',
            fechaNace: new Date
        }
    ],
    estudios: [
        {
            id: 0,
            idEstudio: 0,
            idCandidato: 0,
            idUsuario: 0,
            idInstitucion: 0,
            fecha_Desde: new Date,
            fecha_Hasta: new Date,
            id_estado_estudio: 0,
            id_tipo_estudio: 0,
            id_nivel_estudio: 0,
            id_tipo_curso: 0,
            accion: 0
        }
    ],
    idiomas: [
        {
            id: 0,
            idIdi: 0,
            idCandidato: 0,
            idUsuario: 0,
            accion: 0
        }
    ],
    referencias: [
        {
            id: 0,
            idCandidato: 0,
            nombre: '',
            celular: '',
            telefono: '',
            mail: '',
            tipo: 0,
            idUsuario: 0,
            empresa: '',
            Cargo: '',
            Observaciones: '',
            TiempoLaborado: '',
            MotivoRetiro: '',
            accion: 0
        }
    ],
    categorias: [
        {
            id: 0,
            idCandidato: 0,
            IdCategoria: 0,
            FechaVence: new Date,
            accion: 0,
        }
    ],
    cargos: [
        {
            id: 0,
            idCandidato: 0,
            idPerfil: 0,
            idUsuario: 0,
            accion: 0
        }
    ]
    }
    console.log('datos temporales', this.datosBasicos);
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

    const parentesco = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'parentesco');
    if(parentesco === null){
      setTimeout(
        () => {
          this.messageService.error('Error', 'Error interno del servidor al cargar las opciones de parentezco');
        }, 1000);
    }else{
            console.log(parentesco);
      this.parentescos = parentesco;
    }

    loading.close();
  }

  public async selectsValidate(selectContent:any, text: string, arrayData:any){
    if(selectContent === null){
      setTimeout(
        () => {
          this.messageService.error('Error', 'Error interno del servidor al cargar ' + text);
        }, 1000);
     }else{
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

  addReference() {
    this.FAMILIAR_DATA.push(this.setRelatives);
    console.log('Data reference',this.FAMILIAR_DATA);
    this.myReferenceArray.push(this.setRelatives);
    this.setRelatives = {
      id_candidato: 0,
      nombre: '',
      id_Parentesco: 0,
      edad: 0,
      ne: 0,
      ec: 0,
      ocupacion: '',
      empresa: '',
      telResidencia: '',
      otroFamiliar: 0,
      id: 0,
      accion: 0,
      nit: '',
      fechaNace: new Date,
    };
    this.myReferenceArray = [...this.myReferenceArray];


    console.warn(this.myReferenceArray);
  }

  public  borrarItem(element: any){
    this.myReferenceArray.splice(element, 1);
    this.myReferenceArray = [...this.myReferenceArray];
    console.log(this.myReferenceArray);
  }

  public guardarProgreso(){
    console.log('Info Familiar Guardada', this.datosInfoFamilia);
    this._storaged.set('datosInfoFamilia', this.myReferenceArray);

  }

  public getLocalStorage(){
    console.log('Cargar Datos Info Familiar', this.myReferenceArray);
      this.datosBasicos = this._storaged.get('datosCandidatoStorage');
      this.idiomas = this._storaged.get('idiomasStorage');
      this.datosadicionales = this._storaged.get('datosAdicionalesStorage');
      this.categoriaLicencia = this._storaged.get('datosLicencia');
      // this.archivos = this._storaged.get('datosInfoFamilia');
      this.estudios = this._storaged.get('datosEstudiosStorage');
      this.referencias = this._storaged.get('datosReferenciasStorage');
      this.cargos = this._storaged.get('otrosCargosStorage');
      this.inforFamilia = this._storaged.get('datosInfoFamilia');
    // this._storaged.get('datosInfoFamilia');
  }

  public enviarFormulario(){
    console.log('Formulario Guardado', this.todosDatosCandidato);

    this._storaged.clear();
  }

  public labelTable(id: number, list: any[]){
    return this._addItemTable.findLabel(id, list);
  }

}
