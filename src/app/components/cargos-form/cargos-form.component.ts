import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Cargos } from './interfaces/cargos.interface';
import * as _ from 'lodash';
import { TodosDatosCandidato } from '../datos-basicos-form/interfaces/candidato.interface';
import { EnvService } from 'src/app/services/env.service';

interface Cargo {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss'],
})
export class CargosFormComponent implements OnInit {
  public idEmp: number = this.envService.company;
  public idPerfilPrevio: any[] = [];
  public disabledButtonNext: boolean = true;
  public candidatoId = 0;

  public todosCandidatoStorage: TodosDatosCandidato = {
    candidato: {
      id: 0,
      emp: this.idEmp,
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

  public numRegla: number = this.envService.regla;
  public cargosArray: any[] = [];
  public cargos: Cargo[] = [];

  public otrosCargos: Cargos = {
    id: 0,
    idPerfil: 0,
    idCandidato: 0,
    idUsuario: 0,
    accion: 0,
  };

  constructor(
    private _storaged: SessionStorageService,
    private apiService: ApiService,
    private readonly envService: EnvService,
    private messageService: MessagesService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo(
      'Estamos cargando la información... Por favor espere.'
    );
    const idEmp = this.idEmp;
    const numRegla = this.numRegla;

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

    const datosTodosCandidatoStorage = this._storaged.get(
      'todosCandidatoStorage'
    );

    if (datosTodosCandidatoStorage && datosTodosCandidatoStorage != null) {
      this.todosCandidatoStorage = datosTodosCandidatoStorage;
    }

    if (this.todosCandidatoStorage.candidato.nit != '') {
      const getICargos = this.todosCandidatoStorage.cargos.filter(
        (cargo) => cargo.accion == 0
      );

      if (getICargos && getICargos.length > 0) {
        const getPerfil = getICargos.map(
          (element: { idPerfil: number }) => element.idPerfil
        );
        this.idPerfilPrevio = [...getPerfil];
      }

      if (
        this.todosCandidatoStorage.cargos &&
        this.todosCandidatoStorage.cargos.length > 0
      ) {
        const cargosC = this.todosCandidatoStorage.cargos.map(
          (item: { idPerfil: any }) => item.idPerfil
        );

        this.idPerfilPrevio = [...cargosC];

        this.cargosArray = this.idPerfilPrevio.map((idPerfil) => ({
          ...this.otrosCargos,
          idPerfil,
        }));
        this.todosCandidatoStorage.cargos = [...this.cargosArray];
      }
    } else {
      this.todosCandidatoStorage = this.todosCandidatoStorage;
    }

    loading.close();
  }

  ngOnDestroy() {
    const originals = this._storaged.get('cargosOriginales');
    if (originals && originals.length > 0) {
      const newCargos = this.compararArreglos(originals, this.idPerfilPrevio);
      this.todosCandidatoStorage.cargos = [...newCargos];
    } else {
      this.cargosArray = this.idPerfilPrevio.map((idPerfil) => ({
        ...this.otrosCargos,
        idPerfil,
      }));
      this.todosCandidatoStorage.cargos = [...this.cargosArray];
    }

    this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
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

  public compararArreglos(originals: any[], itemPrevio: number[]): Cargos[] {
    const filterProfiles: Cargos[] = [];

    // Copiar objetos del array a al array c y marcar como eliminados si no están en el array b
    for (const itemA of originals) {
      const newItem: Cargos = { ...itemA };
      if (!itemPrevio.includes(itemA.idIdi)) {
        newItem.accion = 1;
      }
      filterProfiles.push(newItem);
    }

    // Agregar nuevos objetos a partir del array b
    for (const itemB of itemPrevio) {
      const foundItem = originals.find((item) => item.idIdi === itemB);

      if (!foundItem) {
        const newItem: Cargos = {
          id: 0,
          idPerfil: itemB,
          idCandidato: 0,
          idUsuario: 0,
          accion: 0,
        };
        filterProfiles.push(newItem);
      }
    }

    return filterProfiles;
  }

  public guardarProgreso() {
    const originals = this._storaged.get('cargosOriginales');
    if (originals && originals.length > 0) {
      const newCargos = this.compararArreglos(originals, this.idPerfilPrevio);
      this.todosCandidatoStorage.cargos = [...newCargos];
    } else {
      this.cargosArray = this.idPerfilPrevio.map((idPerfil) => ({
        ...this.otrosCargos,
        idPerfil,
      }));
      this.todosCandidatoStorage.cargos = [...this.cargosArray];
    }
    this._storaged.set('todosCandidatoStorage', this.todosCandidatoStorage);
    this.messageService.success(
      'Progreso Guardado',
      'Su progreso se guardó de manera correcta'
    );
    this.disabledButtonNext = false;
  }
}
