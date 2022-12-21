import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Cargos } from './interfaces/cargos.interface';
import * as _ from 'lodash';

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

  public idPerfilPrevio: any[] = [];
  public disabledButtonNext: boolean = true;
  public candidatoId = 0;

  public idEmp: number = 3;
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


 const candidatoExistente = this._storaged.get('candidatoExistente');
      console.log('Datos adicionales desde storage', candidatoExistente);

      if(candidatoExistente  && candidatoExistente.length > 0){
        console.log('Candidato existente', candidatoExistente);
      this.candidatoId = candidatoExistente[0].id_rh_candidato

      const getCargos = await this.getAnyInformation('/hojadevida/candidatoPerfiles/' + this.candidatoId);
      console.log('Cargos: ', getCargos);
      // const newArr = getCargos.map((obj: {
      //   id: number;
      //   id_rh_candidato: number;
      //   id_rh_perfil: number;
      //   cargo: string;

      // }) => ({
      //   obj.id

      // }));
      // console.log('new Array', newArr);
      // this.idPerfilPrevio = [...newArr]
      // // console.log('Array cargos',this.cargos);
      // }

      const newArr = getCargos.map((item: { id_rh_perfil: any; }) => item.id_rh_perfil);
      console.log('new Array', newArr);
      this.idPerfilPrevio = [...newArr]
      }
    //   else{
    //     setTimeout(
    //       () => {
    //         this.messageService.info("Atención...", "El documento ingresado no tiene ningún formulario previamente diligenciado");
    //       }, 1000);
    //       // this.disabledBtnCrear = false;

    // }
    loading.close();
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
    console.log('Como se guardan los perfiles', this.idPerfilPrevio);
    this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
      ...this.otrosCargos, idPerfil
    }));
    // console.log('Cargos Guardados', this.otrosCargos);
    this._storaged.set('otrosCargosStorage', this.cargosArray);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Cargos', this.otrosCargos);
    // this._storaged.get('otrosCargosStorage');
  }
}
