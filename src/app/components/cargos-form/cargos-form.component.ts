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


      if(candidatoExistente  && candidatoExistente.length > 0){

      this.candidatoId = candidatoExistente[0].id

      const getCargos = await this.getAnyInformation('/hojadevida/candidatoPerfiles/' + this.candidatoId);

      const newArr = getCargos.map((item: { id_rh_perfil: any; }) => item.id_rh_perfil);
      this.idPerfilPrevio = [...newArr]
      }

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

    this.cargosArray = this.idPerfilPrevio.map(idPerfil => ({
      ...this.otrosCargos, idPerfil
    }));

    this._storaged.set('otrosCargosStorage', this.cargosArray);
    this.messageService.success('Progreso Guardado', 'Su progreso se guardó de manera correcta');
    this.disabledButtonNext = false;
  }

}
