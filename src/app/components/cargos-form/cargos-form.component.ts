import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Cargos } from './interfaces/cargos.interface';
import * as _ from 'lodash';
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';

interface Cargo{
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {

  public idEmp: number = 3;
  public idPerfilPrevio: any[] = [];
  public disabledButtonNext: boolean = true;
  public candidatoId = 0;

  public todosCandidatoStorage: TodosDatosCandidato = {
    candidato:{
      id:0,
      emp: this.idEmp,
      id_usuario: 0,
      id_tipo_candidato: null,
      id_rh_tipo_documento: null,
      nit: '',
      estado: 1,
      fecExpedicion: new Date,
      lugarExpedicion: '',
      idCotClientePais: null,
      nombre: '',
      apellido: '',
      genero: null,
      fecha_nacimiento: new Date,
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
      fecha_vence_licencia: new Date,
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
    ]
  }

  // public idEmp: number = 3;
  public numRegla: number = 159;
  public cargosArray: any[] = [];
  public cargos: Cargo[] = [];

  public otrosCargos: Cargos = {
    id: 0,
    idPerfil: 0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
  }

  constructor(
    private _storaged: SessionStorageService,
    private apiService: ApiService,
    private messageService: MessagesService,
    ) { }

  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla

    const cargoAplica = await this.getAnyInformation('/hojadevida/perfiles/' + idEmp);
    if(cargoAplica === null){
      this.messageService.error('Error', 'Error interno del servidor al cargar los perfiles');
      return;
    }
    this.cargos = _.orderBy(cargoAplica, ['id'], ['asc']);

    // const cargosCandidato = this._storaged.get('otrosCargosStorage');
    this.todosCandidatoStorage = this._storaged.get('todosCandidatoStorage');
    // const candidatoExistente = this._storaged.get('candidatoExistente');


    console.log("llego a cargos Todos? " ,this.todosCandidatoStorage);
    if(this.todosCandidatoStorage.cargos && this.todosCandidatoStorage.cargos.length > 0){

      const cargosC = this.todosCandidatoStorage.cargos.map((item: { idPerfil: any; }) => item.idPerfil);
      this.idPerfilPrevio = [...cargosC];
      // console.log("Los cargos ",this.cargosArray);
      this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
        ...this.otrosCargos, idPerfil
      }));
      this.todosCandidatoStorage.cargos = [...this.cargosArray]
        //  this._storaged.set('otrosCargosStorage', this.cargosArray);
        //  console.log('otrosCargosStorage', this.cargosArray);
         console.log('Storage Cargos', this.todosCandidatoStorage);
         this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
    }
    // if(cargosCandidato && cargosCandidato.length > 0){
    //   console.log("ocurre cargos");
    //   const cargosC = cargosCandidato.map((item: { idPerfil: any; }) => item.idPerfil);
    //   this.idPerfilPrevio = [...cargosC];
    //   console.log("Los cargos ",this.cargosArray);
    //   this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
    //     ...this.otrosCargos, idPerfil
    //   }));
    //      this._storaged.set('otrosCargosStorage', this.cargosArray);
    // }else if(candidatoExistente  && candidatoExistente.length > 0){

    //   this.candidatoId = candidatoExistente[0].id

    //   const getCargos = await this.getAnyInformation('/hojadevida/candidatoPerfiles/' + this.candidatoId);
    //   console.log("Cargos en  perfiles con id", getCargos);
    //   const newArr = getCargos.map((item: { id_rh_perfil: any; }) => item.id_rh_perfil);
    //   this.idPerfilPrevio = [...newArr];
    //   console.log("Id Previo", this.idPerfilPrevio);
    //   this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
    //     ...this.otrosCargos, idPerfil
    //   }));

    //   console.log("cargos despues de previo ", this.cargosArray);

    //   this._storaged.set('otrosCargosStorage', this.cargosArray);
    //   }


    loading.close();
  }

  ngOnDestroy() {
    this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
      ...this.otrosCargos, idPerfil
    }));

    // this._storaged.set('otrosCargosStorage', this.cargosArray);
    this.todosCandidatoStorage.cargos = [...this.cargosArray]
    //  this._storaged.set('otrosCargosStorage', this.cargosArray);

     this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
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

  public guardarProgreso(){

    this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
      ...this.otrosCargos, idPerfil
    }));

    // this._storaged.set('otrosCargosStorage', this.cargosArray);

    this.todosCandidatoStorage.cargos = [...this.cargosArray]
        //  this._storaged.set('otrosCargosStorage', this.cargosArray);
         console.log('otrosCargosStorage', this.cargosArray);
         console.log('Storage Cargos', this.todosCandidatoStorage);
         this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;
  }

  public getLocalStorage(){

        // this.cargosArray = this._storaged.get('otrosCargosStorage');
    }

}
